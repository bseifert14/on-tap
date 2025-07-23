import { useState } from "react";
import ViewControls from "../components/ViewControls";
import CalendarView from "../modules/calendar/CalendarView";
import styles from "../styles/Calendar.module.css";

export default function Calendar() {
  const [selectedType, setSelectedType] = useState("All");

  return (
    <div className={styles.calendarBody}>
      <ViewControls
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        currentView="calendar"
      />
      <CalendarView selectedType={selectedType} />
    </div>
  );
}