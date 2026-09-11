import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import { User } from "lucide-react";
import NavButton from "./NavButton";
import useIsAdmin from "../../utils/hooks/useIsAdmin";

export default function Nav({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);
  const { isAdmin } = useIsAdmin();

  const handleCloseAndLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navLinks}>
        <NavButton path="/" title="Home" />
        <NavButton path="/calendar" title="Calendar" />
        <NavButton path="/about" title="About" />
        <NavButton path="/contact" title="Contact Us" />

        {!isLoggedIn && <NavButton path="/post-event" title="Submit an Event" />}

        {isLoggedIn && (
          <div className={styles.userMenuWrapper} ref={dropdownRef}>
            <button className={styles.userIcon} onClick={() => setDropdownOpen((prev) => !prev)}>
              <User strokeWidth={1.5} />
            </button>
            {dropdownOpen && (
              <div className={styles.userDropdown}>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                {isAdmin && (
                  <Link to="/admin/submissions" onClick={() => setDropdownOpen(false)}>
                    Admin
                  </Link>
                )}
                <button onClick={handleCloseAndLogout}>Log Out</button>
              </div>
            )}
          </div>
        )}
    </nav>
  );
}
