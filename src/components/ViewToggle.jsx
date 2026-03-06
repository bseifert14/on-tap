import { useNavigate, useLocation } from "react-router-dom";
import Button from './common/Button';
import styles from "../styles/ViewToggle.module.css";

export default function ViewToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalendarSelected = location.pathname === "/calendar";


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
