import styles from "../../styles/common/Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export default function Button({ children, className, onClick, isDisabled }: ButtonProps) {
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
