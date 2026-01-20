import { useNavigate, useLocation } from "react-router-dom";
import Button from './common/Button';
import styles from "../styles/ViewToggle.module.css";

export default function ViewToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalendarSelected = location.pathname === "/calendar";
  const activeListClass = `${styles.toggleBtnActive} ${styles.toggleBtnActiveList}`;
  const activeCalendarClass = `${styles.toggleBtnActive} ${styles.toggleBtnActiveCalendar}`;

  return (
    <div className={styles.toggleWrapper}>
      <Button
        className={`${styles.toggleBtn} ${!isCalendarSelected ? activeListClass : styles.toggleBtnInactive}`}
        onClick={() => navigate("/")}
      >
        List View
      </Button>
      <Button
        className={
          `${styles.toggleBtn} ${isCalendarSelected ? activeCalendarClass : styles.toggleBtnInactive}`
        }
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </Button>
    </div>
  );
}
