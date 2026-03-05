import styles from '../../styles/EventFilters.module.css';

import { EVENT_TYPE_FILTERS } from '../../constants/eventTypes';

export default function EventFilters({ activeId, onSelect }) {
  return (
      <div className={styles.filtersContainer} aria-label="Event categories">
        {EVENT_TYPE_FILTERS.map(({ label, value, icon: Icon }) => {
          const active = value === activeId;

          return (
            <button
              key={value}
              type="button"
              className={`${styles.filterOption} ${active ? styles.active : ""}`}
              onClick={() => onSelect(value)}
            >
              <Icon size={12} className={styles.icon} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
}
