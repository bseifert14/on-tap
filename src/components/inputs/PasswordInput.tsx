import { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

import styles from "../../styles/common/forms.module.css";
import BaseInput from "./BaseInput";

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  showPassword?: boolean;
  onShowPasswordToggle?: () => void;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPassword, onShowPasswordToggle, disabled, placeholder = "••••••••", ...rest }, ref) => {
    const toggle = onShowPasswordToggle ? (
      <button
        type="button"
        className={styles.inputIconButton}
        onClick={onShowPasswordToggle}
        disabled={disabled}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    ) : undefined;

    return (
      <BaseInput
        ref={ref}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        trailingAction={toggle}
        {...rest}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
