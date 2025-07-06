import { useState } from "react";
import { Funnel } from "lucide-react";

export default function FilterBar({ selectedType, setSelectedType }) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const eventTypes = ["All", "Sports", "Games", "Kid Friendly", "Food & Bev", "Music"];
    
  return (
    <div className={styles.filterBar}>
      <button
        className={styles.filterToggle}
        onClick={() => setShowMobileFilters((prev) => !prev)}
      >
        <Funnel size={18} />
        Filters
      </button>

      <div
        className={`${styles.filters} ${showMobileFilters ? styles.show : ""}`}
      >
        {eventTypes.map((type) => (
          <button
            key={type}
            className={`${styles.filterButton} ${selectedType === type ? styles.active : ""}`}
            onClick={() => {
              setSelectedType(type);
              setShowMobileFilters(false); // optional: auto-close on select
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
