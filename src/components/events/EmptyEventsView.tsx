import styles from '../../styles/EmptyEventsView.module.css';
import { ViewType } from '../../types';

interface EmptyEventsViewProps {
  currentView: ViewType;
  onClearFilters?: () => void;
}

export default function EmptyEventsView({ currentView, onClearFilters }: EmptyEventsViewProps) {
  const message = currentView === 'list'
    ? 'Try a different filter or adjusting your search query.'
    : 'Try selecting a different day or adjusting your filters.';

  return (
    <div className={styles.emptyState}>
      <div className={styles.dash} />
      <h2 className={styles.heading}>Nothing here.</h2>
      <p className={styles.sub}>{message}</p>
      {onClearFilters && (
        <button className={styles.pill} onClick={onClearFilters}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 6.5h11M7 2l5 4.5L7 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Clear filters
        </button>
      )}
    </div>
  );
}