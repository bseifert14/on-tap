import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const NAV_ELEMENTS = [
  { to: "/", label: "Home" },
  { to: "/calendar", label: "Calendar" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" }
]

export default function MobileNav({ user, onLogout, onLoginClick, setMenuOpen }) {
  const location = useLocation();
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);

  const handleCloseAndLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    onLoginClick();
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div className={styles.mobileNavContainer}>
        {NAV_ELEMENTS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={
                  location.pathname === to ? styles.mobileNavLinkActive : ""
              }
            >
              {label}
            </Link>
        ))}

        {/* {isLoggedIn ? (
            <>
            <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={
                    location.pathname === "/profile" ? styles.mobileNavLinkActive : ""
                }
            >
                Profile
            </Link>
            <button onClick={handleCloseAndLogout}>Log Out</button>
            </>
        ) : (
            <button onClick={handleLoginClick}>Log In</button>
        )} */}
      </div>
  );
}
