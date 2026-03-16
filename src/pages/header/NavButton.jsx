import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

export default function NavButton({ path, title }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
        <Link
            to={path}
            className={`${isActive(path) ? styles.active : ""}`}
        >
            {title}
        </Link>
  );
}
