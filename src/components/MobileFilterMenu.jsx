import { useState, useEffect } from 'react';
import ViewToggle from "./ViewToggle";
import EventFilters from "./EventFilters";
import styles from "../styles/MobileFilterMenu.module.css";
import { Funnel } from 'lucide-react';

export default function MobileFilterMenu({ selectedType, onTypeChange, currentView }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Discover live music, events, and more — all in one place</h1>

      <div className={styles.toggleWrapper}>
        <ViewToggle currentView={currentView} />
      </div>

      {!isMobile ? (
        <div className={styles.filtersRow}>
          <EventFilters selectedType={selectedType} onTypeChange={onTypeChange} />
        </div>
      ) : (
        <div className={styles.mobileFilters}>
          {selectedType === "All" ? (
            <button className={styles.filterToggleButton} onClick={() => setShowDrawer(true)}>
              <Funnel />
            </button>
          ) : (
            <button
              className={styles.activeFilterButton}
              onClick={() => onTypeChange("All")}
            >
              {selectedType} <span className={styles.clearIcon}>✕</span>
            </button>
          )}

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
