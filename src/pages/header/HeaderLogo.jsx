import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import logo from "/images/site/OnTapDieCut.png";

export default function HeaderLogo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <div className={styles.logoContainer}>
        <div className={styles.logoTop}>ON TAP</div>
        <div className={styles.logoBottom}>
          Stowe
          <span className={styles.logoPeriod}>.</span>
        </div>
      </div>
    </Link>
  );
}
