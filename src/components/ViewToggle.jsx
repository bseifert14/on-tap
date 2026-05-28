import { useNavigate, useLocation } from "react-router-dom";
import { List, CalendarDays } from "lucide-react";
import Button from './common/Button';
import styles from "../styles/ViewToggle.module.css";

export default function ViewToggle({ iconOnly = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalendarSelected = location.pathname === "/calendar";

  if (iconOnly) {
    return (
      <div className={styles.iconToggleWrapper}>
        <button
          className={`${styles.iconToggleBtn} ${!isCalendarSelected ? styles.iconToggleBtnActive : ""}`}
          onClick={() => navigate("/")}
          aria-label="List view"
        >
          <List size={18} strokeWidth={1.75} />
        </button>
        <button
          className={`${styles.iconToggleBtn} ${isCalendarSelected ? styles.iconToggleBtnActive : ""}`}
          onClick={() => navigate("/calendar")}
          aria-label="Calendar view"
        >
          <CalendarDays size={18} strokeWidth={1.75} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.toggleWrapper}>
      <Button
        className={`${styles.toggleBtn} ${!isCalendarSelected ? styles.toggleBtnActive : ""}`}
        onClick={() => navigate("/")}
      >
        List View
      </Button>
      <Button
        className={
          `${styles.toggleBtn} ${isCalendarSelected ? styles.toggleBtnActive : ""}`
        }
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </Button>
    </div>
  );
}
