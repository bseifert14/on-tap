import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/ViewToggle.module.css";

export default function ViewToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalendar = location.pathname === "/calendar";

  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.toggleButton} ${!isCalendar ? styles.active : ""}`}
        onClick={() => navigate("/")}
      >
        List
      </button>
      <button
        className={`${styles.toggleButton} ${isCalendar ? styles.active : ""}`}
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </button>
    </div>
  );
}
