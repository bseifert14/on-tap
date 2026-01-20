import { useState, useEffect } from 'react';
import styles from "../../styles/ViewControls.module.css";

import EventFilters from '../../components/events/EventFilters';
import ViewToggle from '../../components/ViewToggle';
import MobileEventFilters from '../../components/events/MobileEventFilters';

export default function EventFiltersLayout({ selectedType, onTypeChange }) {
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
        <>
          <ViewToggle />
          <MobileEventFilters activeId={selectedType} onSelect={onTypeChange} />
        </>
      )}
    </div>
  );
}
