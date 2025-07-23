import { useState, useEffect } from 'react';
import EventFilters from '../../components/EventFilters';
import styles from "../../styles/ViewControls.module.css";
import { Funnel } from 'lucide-react';
import ViewToggle from '../../components/ViewToggle';
import Button from '../../components/common/Button';

export default function EventFiltersLayout({ selectedType, onTypeChange }) {
  const [showDrawer, setShowDrawer] = useState(false);
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
              onClick={() => setShowDrawer(true)}
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

          {showDrawer && (
            <>
              <div className={styles.backdrop} onClick={() => setShowDrawer(false)} />
              <div className={styles.drawer}>
                <div className={styles.drawerHeader}>
                  <h3>Filters</h3>
                  <button onClick={() => setShowDrawer(false)}>✕</button>
                </div>
                <EventFilters
                  selectedType={selectedType}
                  onTypeChange={(val) => {
                    onTypeChange(val);
                    setShowDrawer(false);
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
