import { EVENT_TYPE_FILTERS } from '../../constants/eventTypes';
import styles from '../../styles/MobileEventFilters.module.css';

interface MobileEventFiltersProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function MobileEventFilters({ activeId, onSelect }: MobileEventFiltersProps) {
  return (
    <div className={styles.scroller} aria-label="Event categories">
      <div className={styles.row}>
        {EVENT_TYPE_FILTERS.map(({ label, value, icon: Icon }) => {
          const active = value === activeId;

          return (
            <button
              key={value}
              type="button"
              className={`${styles.chip} ${active ? styles.active : ""}`}
              onClick={() => onSelect(value)}
            >
              <Icon size={14} className={styles.icon} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
