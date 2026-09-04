import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import styles from "../../styles/UserEventTableRow.module.css";

export default function EventRowActions({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const runAction = (fn) => () => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <button
          className={styles.actionButton}
          onClick={onEdit}
          aria-label="Edit event"
        >
          <Pencil size={15} strokeWidth={1.5} />
        </button>
        <button
          className={`${styles.actionButton} ${styles.delete}`}
          onClick={onDelete}
          aria-label="Delete event"
        >
          <Trash2 size={15} strokeWidth={1.5} />
        </button>
      </div>

      <div className={styles.actionMenu} ref={menuRef}>
        <button
          className={styles.actionButton}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Row actions"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <MoreHorizontal size={15} strokeWidth={1.5} />
        </button>
        {open && (
          <div className={styles.actionDropdown} role="menu">
            <button
              className={styles.actionDropdownItem}
              role="menuitem"
              onClick={runAction(onEdit)}
            >
              <Pencil size={14} strokeWidth={1.5} />
              Edit
            </button>
            <button
              className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDanger}`}
              role="menuitem"
              onClick={runAction(onDelete)}
            >
              <Trash2 size={14} strokeWidth={1.5} />
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
