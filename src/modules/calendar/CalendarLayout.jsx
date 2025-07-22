import { useState } from "react";
import CalendarView from "./CalendarView";
import styles from "../../styles/Calendar.module.css";
import HeroLayout from "../common/HeroLayout";
import EventFiltersLayout from "../common/EventFiltersLayout";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("All");

  return (
    <div>
      <HeroLayout currentView="calendar" />
      <div className={styles.calendarBody} id="eventSection">
        <EventFiltersLayout selectedType={selectedType} onTypeChange={setSelectedType} />
        <CalendarView selectedType={selectedType} />
      </div>
    </div>
  );
}