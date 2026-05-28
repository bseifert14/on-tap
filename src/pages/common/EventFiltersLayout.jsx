import styles from "../../styles/ViewControls.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { Funnel } from "lucide-react";

import ViewToggle from "../../components/ViewToggle";
import SearchBar from "../../components/SearchBar";
import EventFilters from "../../components/events/EventFilters";

export default function EventFiltersLayout({
  selectedType,
  onTypeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onFilterOpen,
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      {!isMobile ? (
        <div className={styles.filterSection}>
          <div className={styles.filterToggleSearch}>
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              onClear={onSearchClear}
            />
            <ViewToggle />
          </div>
          <EventFilters activeId={selectedType} onSelect={onTypeChange} />
        </div>
      ) : (
        <div className={styles.filterSection}>
          <div className={styles.searchFilterRow}>
            <div className={styles.searchWrapper}>
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                onClear={onSearchClear}
              />
            </div>
            {onFilterOpen && (
              <button className={styles.filterIconBtn} onClick={onFilterOpen} aria-label="Open filters">
                <Funnel size={20} color="#8A8680" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <EventFilters activeId={selectedType} onSelect={onTypeChange} />
        </div>
      )}
    </>
  );
}
