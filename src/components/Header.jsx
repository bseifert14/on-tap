import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";

export default function Header({ user, onLogout, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isLoggedIn = !!user;

    const isActive = (path) => location.pathname === path;
  const handleCloseAndLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    onLoginClick();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          WHAT'S <span>UP</span> <em>Stowe</em>
        </div>

        <nav className={styles.desktopNav}>
        <Link
            to="/"
            className={`${styles.navButton} ${isActive("/") ? styles.navButtonActive : ""}`}
        >
            Home
        </Link>
        <Link
            to="/calendar"
            className={`${styles.navButton} ${isActive("/calendar") ? styles.navButtonActive : ""}`}
        >
            Calendar
        </Link>
        <Link
            to="/about"
            className={`${styles.navButton} ${isActive("/about") ? styles.navButtonActive : ""}`}
        >
            About
        </Link>
        <Link
            to="/contact"
            className={`${styles.navButton} ${isActive("/contact") ? styles.navButtonActive : ""}`}
        >
            Contact Us
        </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`${styles.navButton} ${isActive("/profile") ? styles.navButtonActive : ""}`}
            >
                Profile
            </Link>
              <button className={styles.navButton} onClick={onLogout}>Log Out</button>
            </>
          ) : (
            <button className={styles.navButton} onClick={onLoginClick}>Log In</button>
          )}
        </nav>

        <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </header>

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
