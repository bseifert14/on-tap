import { useState } from "react";
import CalendarView from "./CalendarView";
import EventFiltersLayout from "../common/EventFiltersLayout";
import ViewToggle from "../../components/ViewToggle";
import BottomSheet from "../../components/common/BottomSheet";
import MobileFiltersSheet from "../../components/common/MobileFiltersSheet";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import Hero from "../common/Hero";
import { PhotoRef } from "../../constants/photoRef";
import styles from "../../styles/CalendarLayout.module.css";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <Hero bgImageUrl={bgImageUrl} label="this month" />
      <div id="eventSection">
        {isMobile && (
          <div className={styles.calendarHeader}>
            <h2 className={styles.calendarHeading}>Calendar</h2>
            <ViewToggle iconOnly />
          </div>
        )}
        <EventFiltersLayout
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onSearchClear={handleSearchClear}
          onFilterOpen={isMobile ? () => setMenuOpen(true) : undefined}
          hasActiveSubFilters={
            (Array.isArray(selectedType) && selectedType.length > 0) ||
            selectedTimeOfDay.length > 0
          }
        />

        <BottomSheet
          id="calendar-filter-menu"
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          height="80vh"
        >
          <MobileFiltersSheet
            selectedType={selectedType}
            selectedTimeOfDay={selectedTimeOfDay}
            onApply={(type, timeOfDay) => {
              setSelectedType(type);
              setSelectedTimeOfDay(timeOfDay);
            }}
            onClose={() => setMenuOpen(false)}
          />
        </BottomSheet>

        <CalendarView
          selectedType={selectedType}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
