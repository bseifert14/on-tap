import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import { User } from "lucide-react";
import NavButton from "./NavButton";

export default function Nav({ user, onLogout, onLoginClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);

  const handleCloseAndLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  const handleLoginClick = () => {
    setDropdownOpen(false);
    onLoginClick();
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
    <nav className={styles.desktopNav}>
        <NavButton path="/" title="Home" />
        <NavButton path="/calendar" title="Calendar" />
        <NavButton path="/about" title="About" />
        <NavButton path="/contact" title="Contact Us" />

        {/* <div className={styles.userMenuWrapper} ref={dropdownRef}>
        <button className={styles.userIcon} onClick={() => setDropdownOpen((prev) => !prev)}>
            <User strokeWidth={1.5} />
        </button>
        {dropdownOpen && (
            <div className={styles.userDropdown}>
            {isLoggedIn ? (
                <>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                </Link>
                <button onClick={handleCloseAndLogout}>Log Out</button>
                </>
            ) : (
                <button onClick={handleLoginClick}>Log In</button>
            )}
            </div>
        )}
        </div> */}
    </nav>
  );
}
