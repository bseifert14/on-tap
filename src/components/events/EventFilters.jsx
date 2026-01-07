import styles from '../../styles/EventFilters.module.css';
import btnStyles from "../../styles/common/Button.module.css";
import Button from '../common/Button';

import { EVENT_TYPE_FILTERS } from '../../constants/eventTypes';

export default function EventFilters({ selectedType, onTypeChange }) {
  return (
    <div className={styles.filterContainer}>
      {EVENT_TYPE_FILTERS.map(({ label, value, icon: Icon }) => (
        <span className={styles.filterItem} key={value}>
          <Button
            key={value}
            onClick={() => onTypeChange(value)}
            className={
              selectedType === value
                ? btnStyles.buttonActive
                : btnStyles.buttonInactive
            }
          >
            <div className={styles.filter}>
              <Icon size={14} className={styles.icon} strokeWidth={1.5} />
              <span>{label}</span>
            </div>
          </Button>
        </span>
      ))}
    </div>
  );
}
