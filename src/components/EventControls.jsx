import styles from './EventControls.module.css';
import EventFilters from './EventFilters';
import ViewToggle from './ViewToggle';

export default function EventControls({ selectedType, onFilterChange }) {
  return (
    <div className={styles.container}>
      <EventFilters selectedType={selectedType} onChange={onFilterChange} />
      <ViewToggle />
    </div>
  );
}
