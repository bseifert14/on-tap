import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header({ user, onLogout, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);      // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false);  // profile dropdown
  const location = useLocation();
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleCloseAndLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  const handleLoginClick = () => {
    setDropdownOpen(false);
    onLoginClick();
  };

  // Close dropdown on outside click
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
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          WHAT'S <span>UP</span> <em>Stowe</em>
        </div>

        <nav className={styles.desktopNav}>
          <Link to="/" className={`${styles.navButton} ${isActive("/") ? styles.navButtonActive : ""}`}>
            Home
          </Link>
          <Link to="/calendar" className={`${styles.navButton} ${isActive("/calendar") ? styles.navButtonActive : ""}`}>
            Calendar
          </Link>
          <Link to="/about" className={`${styles.navButton} ${isActive("/about") ? styles.navButtonActive : ""}`}>
            About
          </Link>
          <Link to="/contact" className={`${styles.navButton} ${isActive("/contact") ? styles.navButtonActive : ""}`}>
            Contact Us
          </Link>

          <div className={styles.userMenuWrapper} ref={dropdownRef}>
            <button className={styles.userIcon} onClick={() => setDropdownOpen((prev) => !prev)}>
              👤
            </button>

            {dropdownOpen && (
              <div className={styles.userDropdown}>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                    <button onClick={handleCloseAndLogout}>Log Out</button>
                  </>
                ) : (
                  <button onClick={handleLoginClick}>Log In</button>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger (mobile) */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>☰</button>
      </header>

      {/* Mobile Slide-in Menu */}
      {menuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenu}>
            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>✕</button>

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/calendar" onClick={() => setMenuOpen(false)}>Calendar</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={handleCloseAndLogout}>Log Out</button>
              </>
            ) : (
              <button onClick={handleLoginClick}>Log In</button>
            )}
          </div>
        </>
      )}
    </>
  );
}
