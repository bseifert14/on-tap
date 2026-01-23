import styles from "../../styles/ViewControls.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

import ViewToggle from "../../components/ViewToggle";
import MobileEventFilters from "../../components/events/MobileEventFilters";
import SearchBar from "../../components/SearchBar";

export default function EventFiltersLayout({
  selectedType,
  onTypeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
}) {
  const isMobile = useMediaQuery();

  return (
    <div>
      {!isMobile ? (
        <div className={styles.filtersRow}>
          <MobileEventFilters activeId={selectedType} onSelect={onTypeChange} />
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            onClear={onSearchClear}
          />
        </div>
      ) : (
        <>
          <ViewToggle />
          <MobileEventFilters activeId={selectedType} onSelect={onTypeChange} />
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            onClear={onSearchClear}
          />
        </>
      )}
    </div>
  );
}
