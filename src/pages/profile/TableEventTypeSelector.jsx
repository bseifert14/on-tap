import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "../../styles/UserEventTableFilterControls.module.css";
import { EVENT_TYPE_FILTERS } from '../../constants/eventTypes';

export default function EventTypeFilter({ selected, onApply }) {
  const [tempSelection, setTempSelection] = useState(selected || []);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setTempSelection(selected);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, selected]);

  const toggleType = (value) => {
    if (tempSelection.includes(value))
      setTempSelection(tempSelection.filter((t) => t !== value));
    else setTempSelection([...tempSelection, value]);
  };

  const handleApply = () => {
    onApply(tempSelection);
    setOpen(false);
  };

  const badgeCount = tempSelection.length;

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={styles.dropdownButton}
        data-active={selected.length > 0}
        data-open={open}
      >
        <span>Event Type</span>
        {selected.length > 0 && <span className={styles.badge}>{selected.length}</span>}
        <ChevronDown size={14} strokeWidth={2} className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.dropdownPanel}>
          {EVENT_TYPE_FILTERS.filter(({ value }) => value !== "all").map(({ label, value }) => (
            <label key={value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={tempSelection.includes(value)}
                onChange={() => toggleType(value)}
              />
              {label}
            </label>
          ))}
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
