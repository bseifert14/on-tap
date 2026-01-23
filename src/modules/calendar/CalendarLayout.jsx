import { useState } from "react";
import styles from "../../styles/CalendarLayout.module.css";

import CalendarView from "./CalendarView";
import EventFiltersLayout from "../common/EventFiltersLayout";
import HeroLayout from "../common/HeroLayout";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("All");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  return (
    <div>
      <HeroLayout currentView="calendar" />
      <div className={styles.calendarBody} id="eventSection">
        <EventFiltersLayout
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onSearchClear={handleSearchClear}
        />

        <CalendarView
          selectedType={selectedType}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
