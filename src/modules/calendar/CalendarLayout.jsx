import { useState } from "react";
import styles from "../../styles/CalendarLayout.module.css";

import CalendarView from "./CalendarView";
import EventFiltersLayout from "../common/EventFiltersLayout";
import HeroLayout from "../common/HeroLayout";

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