// components/EventFilters.jsx
import styles from '../styles/EventFilters.module.css';

const FILTERS = [
    { label: "All", value: "All", icon: "📅" },
    { label: "Sports", value: "Sports", icon: "⚽" },
    { label: "Games", value: "Games", icon: "🎮" },
    { label: "Kid Friendly", value: "Kid Friendly", icon: "🧒" },
    { label: "Food & Bev", value: "Food & Bev", icon: "🍔" },
    { label: "Music", value: "Music", icon: "🎵" },
  ];
  
  export default function EventFilters({ selectedType, onTypeChange }) {
    return (
      <div className={styles.filterContainer}>
        {FILTERS.map(({ label, value, icon }) => (
          <button
            key={value}
            className={`${styles.filterButton} ${selectedType === value ? styles.active : ''}`}
            onClick={() => onTypeChange(value)}
          >
            <span className={styles.icon}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }
