import styles from "../../styles/common/forms.module.css";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    showPassword?: boolean;
    onShowPasswordToggle?: () => void;
}

export default function PasswordInput({ id, value, onChange, required, disabled, showPassword, onShowPasswordToggle }: PasswordInputProps) {
  return (
    <div className={styles.inputWithIcon}>
        <input
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
        />
        <button
            type="button"
            className={styles.inputIconButton}
            onClick={onShowPasswordToggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
    </div>
  );
}
