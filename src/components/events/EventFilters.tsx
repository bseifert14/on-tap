import { useRef, useState, useEffect } from 'react';
import styles from '../../styles/EventFilters.module.css';
import { EVENT_TYPE_FILTERS } from '../../constants/eventTypes';

interface EventFiltersProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function EventFilters({ activeId, onSelect }: EventFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setFadeLeft(el.scrollLeft > 4);
    setFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateFades();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateFades, { passive: true });
    window.addEventListener('resize', updateFades, { passive: true });
    return () => {
      el.removeEventListener('scroll', updateFades);
      window.removeEventListener('resize', updateFades);
    };
  }, []);

  return (
    <div className={styles.filtersWrapper}>
      {fadeLeft && <div className={styles.fadeLeft} />}
      {fadeRight && <div className={styles.fadeRight} />}
      <div
        ref={scrollRef}
        className={styles.filtersContainer}
        aria-label="Event categories"
      >
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
    </div>
  );
}
