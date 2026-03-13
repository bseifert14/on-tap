import { Search } from "lucide-react";
import styles from "../styles/SearchBar.module.css";

const MUTED_TEXT_COLOR = "#8A8680";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search events and venues",
  onClear,
  onSubmit
}) {
  const showClear = Boolean(value?.length);
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      role="search"
    >
      <div className={styles.searchBar}>
        <Search color={MUTED_TEXT_COLOR} aria-hidden="true" size={15} strokeWidth={1.5} />

        <input
          type="text"
          id="event-search"
          enterKeyHint="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />

        {showClear && (
          <button
            type="reset"
            className={styles.clearBtn}
            onClick={() => onClear?.()}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}
