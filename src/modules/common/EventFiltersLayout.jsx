import styles from "../../styles/ViewControls.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

import ViewToggle from "../../components/ViewToggle";
import MobileEventFilters from "../../components/events/MobileEventFilters";
import SearchBar from "../../components/SearchBar";
import EventFilters from "../../components/events/EventFilters";

export default function EventFiltersLayout({
  selectedType,
  onTypeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      {!isMobile ? (
        <>
          <div className={styles.filtersContainer}>
            <div className={styles.filterToggleSearch}>
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                onClear={onSearchClear}
              />
              <ViewToggle />
            </div>
            <MobileEventFilters activeId={selectedType} onSelect={onTypeChange} />
          </div>
        </>
      ) : (
        <div className={styles.filterSection}>
          <ViewToggle />
          <EventFilters activeId={selectedType} onSelect={onTypeChange} />
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            onClear={onSearchClear}
          />
        </div>
      )}
    </>
  );
}
