import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import logo from "../../../public/images/site/OnTapDieCut.png";

export default function HeaderLogo() {
  return (
    <div className={styles.logoWrapper}>
        <Link to="/" className={styles.logo}>
            <img src={logo} alt="On Tap Stowe" className={styles.logoImg} />
        </Link>
    </div>
  );
}
