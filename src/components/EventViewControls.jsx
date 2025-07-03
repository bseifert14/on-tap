// components/EventViewControls.jsx
import styles from '../styles/EventViewControls.module.css';
import ViewToggle from './ViewToggle';
import EventFilters from './EventFilters';

export default function EventViewControls({ selectedType, setSelectedType }) {
  return (
    <div className={styles.controlsContainer}>
      <ViewToggle />
      <EventFilters
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}
