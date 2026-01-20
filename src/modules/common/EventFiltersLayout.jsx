import styles from "../../styles/ViewControls.module.css";
import useMediaQuery from '../../utils/hooks/useMediaQuery';

import EventFilters from '../../components/events/EventFilters';
import ViewToggle from '../../components/ViewToggle';
import MobileEventFilters from '../../components/events/MobileEventFilters';
import { useState } from "react";
import SearchBar from "../../components/SearchBar";

export default function EventFiltersLayout({ selectedType, onTypeChange }) {
  const isMobile = useMediaQuery();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {!isMobile ? (
        <div className={styles.filtersRow}>
          <EventFilters selectedType={selectedType} onTypeChange={onTypeChange} />
          <ViewToggle />
        </div>
      ) : (
        <>
          <ViewToggle />
          <MobileEventFilters activeId={selectedType} onSelect={onTypeChange} />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
          />
        </>
      )}
    </div>
  );
}
