import React from "react";
import styles from "../../styles/common/Button.module.css";

export default function Button({ children, className, onClick }) {
  return (
    <button
        className={`${styles.button} ${className}`}
        onClick={onClick}>
            {children}
    </button>
  );
}
