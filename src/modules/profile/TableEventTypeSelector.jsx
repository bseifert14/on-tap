import { useState, useRef, useEffect } from "react";
import styles from "../../styles/UserEventTableFilterControls.module.css";

const EVENT_TYPES = ["Music", "Food", "Art", "Fitness", "Other"];

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

  const toggleType = (type) => {
    if (tempSelection.includes(type))
      setTempSelection(tempSelection.filter((t) => t !== type));
    else setTempSelection([...tempSelection, type]);
  };

  const handleApply = () => {
    onApply(tempSelection);
    setOpen(false);
  };

  const badgeCount = tempSelection.length;

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <button onClick={() => setOpen((o) => !o)} className={styles.dropdownButton}>
    Event Type
    {selected.length > 0 && <span className={styles.badge}>{selected.length}</span>}
    ▼
    </button>
      {open && (
        <div className={styles.dropdownPanel}>
          {EVENT_TYPES.map((type) => (
            <label key={type} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={tempSelection.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
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
