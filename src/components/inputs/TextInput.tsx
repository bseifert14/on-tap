import styles from "../../styles/common/forms.module.css";

interface InputProps {
  id: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function TextInput({ id, type, value, onChange, placeholder, required, disabled }: InputProps) {
  return (
    <input
        id={id}
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={styles.input}
    />
  );
}
