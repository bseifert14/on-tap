import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
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
      <button className={styles.filterButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span className={styles.buttonLabel}>Date ▼</span>
        {selected && (
            <span
                onClick={(e) => {
                e.stopPropagation();
                onClear?.();
                setTempDate(null);
                }} 
                className={styles.badge}>
                    x
                </span>
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
