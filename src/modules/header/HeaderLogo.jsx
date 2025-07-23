import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import logo from "../../../public/images/site/OnTapDieCut.png";

export default function HeaderLogo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <img src={logo} alt="On Tap Stowe" className={styles.logoImg} />
    </Link>
  );
}
