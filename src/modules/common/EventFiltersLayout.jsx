import { useState, useEffect } from 'react';
import styles from "../../styles/ViewControls.module.css";

import { Funnel } from 'lucide-react';

import Button from '../../components/common/Button';
import MobileFilterMenu from '../../components/events/MobileFilterMenu';
import ViewToggle from '../../components/ViewToggle';

export default function EventFiltersLayout({ selectedType, onTypeChange }) {
  const [showMobileFilterMenu, setShowMobileFilterMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 1042);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      {!isMobile ? (
        <div className={styles.filtersRow}>
          <EventFilters selectedType={selectedType} onTypeChange={onTypeChange} />
          <ViewToggle />
        </div>
      ) : (
        <div className={styles.mobileFilters}>
          {selectedType === "All" ? (
            <Button
              className={styles.filterToggleButton}
              onClick={() => setShowMobileFilterMenu(true)}
            >
              <Funnel strokeWidth={1.5} color="black"/>
            </Button>
          ) : (
            <button
              className={styles.activeFilterButton}
              onClick={() => onTypeChange("All")}
            >
              {selectedType} <span className={styles.clearIcon}>✕</span>
            </button>
          )}
          <ViewToggle />

          {showMobileFilterMenu && (
            <>
              <div className={styles.backdrop} onClick={() => setShowMobileFilterMenu(false)} />
              <div className={styles.drawer}>
                <div className={styles.drawerHeader}>
                  <h3>Filters</h3>
                  <button onClick={() => setShowMobileFilterMenu(false)}>✕</button>
                </div>
                <MobileFilterMenu
                  selectedType={selectedType}
                  onTypeChange={(val) => {
                    onTypeChange(val);
                    setShowMobileFilterMenu(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
