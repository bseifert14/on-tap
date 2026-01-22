import { Search } from "lucide-react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search Events...",
  onClear,
}) {
  const showClear = Boolean(value?.length);

  return (
    <div className={styles.inputShell}>
        <Search className={styles.icon} aria-hidden="true" />

        <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
        />

        {showClear && (
            <button
            type="button"
            className={styles.clearBtn}
            onClick={() => onClear?.()}
            aria-label="Clear search"
            >
            ×
            </button>
        )}
        </div>
  );
}
