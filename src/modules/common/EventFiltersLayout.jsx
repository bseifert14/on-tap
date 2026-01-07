import { useState, useEffect } from 'react';
import styles from "../../styles/ViewControls.module.css";

import { Funnel } from 'lucide-react';

import Button from '../../components/common/Button';
import EventFilters from '../../components/events/EventFilters';
import ViewToggle from '../../components/ViewToggle';
import MobileMenu from '../../components/common/MobileMenu';

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
          <MobileMenu
            isOpen={showDrawer}
            onClose={() => setShowDrawer(false)}
            title="Filters"
            id="mobile-filters-menu"
          >
            <EventFilters
              isMenu={true}
              selectedType={selectedType}
              onTypeChange={(val) => {
                onTypeChange(val);
                setShowDrawer(false);
              }}
            />
          </MobileMenu>
        </div>
      )}
    </div>
  );
}
