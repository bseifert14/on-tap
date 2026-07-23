import { forwardRef } from "react";
import styles from "../../styles/common/forms.module.css";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ leadingIcon, trailingAction, className, ...rest }, ref) => {
    const inputClass = [
      styles.input,
      leadingIcon && styles.inputPaddedLeft,
      trailingAction && styles.inputPaddedRight,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputEl = <input ref={ref} className={inputClass} {...rest} />;

    if (!leadingIcon && !trailingAction) return inputEl;

    return (
      <div className={styles.inputWithIcon}>
        {leadingIcon && <span className={styles.inputLeadingIcon}>{leadingIcon}</span>}
        {inputEl}
        {trailingAction}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
