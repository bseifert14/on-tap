import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ChevronDown, X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/UserEventTableFilterControls.module.css";

export default function TableEventDateSelector({ selected, onApply, onClear }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tempDate, setTempDate] = useState(selected ? new Date(selected) : null);

  useEffect(() => {
    setTempDate(selected ? new Date(selected) : null);
  }, [selected]);

  const handleApply = () => {
    if (tempDate) {
      const formatted = tempDate.toISOString().split("T")[0]; // YYYY-MM-DD
      onApply(formatted);
    }
    setDropdownOpen(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <button
        type="button"
        className={styles.filterButton}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        data-active={Boolean(selected)}
        data-open={dropdownOpen}
      >
        <span>Date</span>
        {selected ? (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date filter"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
              setTempDate(null);
            }}
            className={styles.clearBadge}
          >
            <X size={12} strokeWidth={2.5} />
          </span>
        ) : (
          <ChevronDown size={14} strokeWidth={2} className={styles.chevron} />
        )}
      </button>


      {dropdownOpen && (
        <div className={styles.dropdownMenu}>
          <DatePicker
            selected={tempDate}
            onChange={(date) => setTempDate(date)}
            inline
          />
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
