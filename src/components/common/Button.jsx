import styles from "../../styles/common/Button.module.css";

export default function Button({ children, className, onClick, isDisabled }) {
  return (
    <button
        className={`${styles.button} ${className}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
    </button>
  );
}
