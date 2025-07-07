import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { User } from "lucide-react";
import logo from "../../public/images/site/OnTapDieCut.png";

export default function Header({ user, onLogout, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="On Tap Stowe" className={styles.logoImg} />
          </Link>
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

          <div className={styles.userMenuWrapper} ref={dropdownRef}>
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
          </div>
        </nav>

        <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </header>

      {menuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenu}>
            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
              ✕
            </button>
            {[
              { to: "/", label: "Home" },
              { to: "/calendar", label: "Calendar" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact Us" },
            ].map(({ to, label }) => (
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

            {isLoggedIn ? (
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
            )}
          </div>
        </>
      )}
    </>
  );
}
