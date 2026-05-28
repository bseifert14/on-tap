import styles from "../../styles/ViewControls.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { Funnel } from "lucide-react";

import ViewToggle from "../../components/ViewToggle";
import SearchBar from "../../components/SearchBar";
import EventFilters from "../../components/events/EventFilters";
import { getParentCategory } from "../../constants/eventTypes";

export default function EventFiltersLayout({
  selectedType,
  onTypeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onFilterOpen,
  hasActiveSubFilters = false,
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const activePillId = Array.isArray(selectedType)
    ? selectedType.length ? getParentCategory(selectedType[0]) : "all"
    : selectedType;

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
          <EventFilters activeId={activePillId} onSelect={onTypeChange} />
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
              <div className={styles.filterIconWrapper}>
                <button className={styles.filterIconBtn} onClick={onFilterOpen} aria-label="Open filters">
                  <Funnel size={20} color="#8A8680" strokeWidth={1.5} />
                </button>
                {hasActiveSubFilters && <span className={styles.filterBadge} />}
              </div>
            )}
          </div>
          <EventFilters activeId={activePillId} onSelect={onTypeChange} />
        </div>
      )}
    </>
  );
}
