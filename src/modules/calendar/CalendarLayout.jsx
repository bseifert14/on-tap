import { useState } from "react";
import CalendarView from "./CalendarView";
import styles from "../../styles/Calendar.module.css";
import HeroLayout from "../common/HeroLayout";
import EventFiltersLayout from "../common/EventFiltersLayout";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("All");

  return (
    <div className={styles.calendarBody}>
      <HeroLayout currentView="calendar" />
      <EventFiltersLayout selectedType={selectedType} onTypeChange={setSelectedType} />
      <CalendarView selectedType={selectedType} />
    </div>
  );
}