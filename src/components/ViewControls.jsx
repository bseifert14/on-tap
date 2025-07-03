import ViewToggle from "./ViewToggle";
import EventFilters from "./EventFilters";
import styles from "../styles/ViewControls.module.css";

export default function ViewControls({ selectedType, onTypeChange, currentView }) {
  return (
    <div className={styles.controlsContainer}>
      <ViewToggle currentView={currentView} />
      <EventFilters selectedType={selectedType} onTypeChange={onTypeChange} />
    </div>
  );
}
