import { forwardRef } from "react";
import styles from "../../styles/common/forms.module.css";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  trailingAction?: React.ReactNode;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ trailingAction, className, ...rest }, ref) => {
    const inputEl = (
      <input
        ref={ref}
        className={`${styles.input} ${className ?? ""}`.trim()}
        {...rest}
      />
    );

    if (!trailingAction) return inputEl;

    return (
      <div className={styles.inputWithIcon}>
        {inputEl}
        {trailingAction}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
