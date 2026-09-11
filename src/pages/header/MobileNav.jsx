import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import useIsAdmin from "../../utils/hooks/useIsAdmin";

const NAV_ELEMENTS = [
  { to: "/", label: "Home" },
  { to: "/calendar", label: "Calendar" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" }
]

const ANON_NAV_ELEMENTS = [
  { to: "/post-event", label: "Submit an Event" }
]

export default function MobileNav({ user, onLogout, setMenuOpen }) {
  const location = useLocation();
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);
  const { isAdmin } = useIsAdmin();

  const handleCloseAndLogout = () => {
    setMenuOpen(false);
    onLogout();
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

        {!isLoggedIn && ANON_NAV_ELEMENTS.map(({ to, label }) => (
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

        {isLoggedIn && (
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
              {isAdmin && (
                <Link
                    to="/admin/submissions"
                    onClick={() => setMenuOpen(false)}
                    className={
                        location.pathname === "/admin/submissions" ? styles.mobileNavLinkActive : ""
                    }
                >
                    Admin
                </Link>
              )}
              <button onClick={handleCloseAndLogout}>Log Out</button>
            </>
        )}
      </div>
  );
}
