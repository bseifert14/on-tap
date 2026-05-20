import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const FITNESS_FILTERS = [
  { label: "Yoga", value: "yoga" }
]

export default function MobileFiltersList({ setMenuOpen, setSelectedType }) {
  const location = useLocation();
  const dropdownRef = useRef(null);
  
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
        {FITNESS_FILTERS.map(({ label, value }) => (
            <button onClick={() => setSelectedType(value)}>
                {label}
            </button>
        ))}
      </div>
  );
}
