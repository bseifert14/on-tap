import { useState } from "react";
import CalendarView from "./CalendarView";
import EventFiltersLayout from "../common/EventFiltersLayout";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import Hero from "../common/Hero";
import { PhotoRef } from "../../constants/photoRef";

export default function CalendarLayout() {
  const [selectedType, setSelectedType] = useState("all");
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
