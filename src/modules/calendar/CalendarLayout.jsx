import { useState } from "react";
import styles from "../../styles/CalendarLayout.module.css";
import CalendarView from "./CalendarView";
import EventFiltersLayout from "../common/EventFiltersLayout";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import Hero from "../common/Hero";
import { PhotoRef } from "../../constants/photoRef";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const bgImageUrl = isMobile ? PhotoRef.MansfieldStars : PhotoRef.StowePanorama;

  return (
    <div>
      <Hero
        title="What's going on this month in Stowe?"
        subtitleTop="From mountain adventures to live bands - never miss a beat around town."
        ctaLabel="Explore Events"
        bgImageUrl={bgImageUrl}
      />
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
