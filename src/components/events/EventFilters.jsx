import styles from '../../styles/EventFilters.module.css';
import btnStyles from "../../styles/common/Button.module.css";
import Button from '../common/Button';
import {
  Volleyball,
  Gamepad,
  Baby,
  Utensils,
  Music,
  SquareMenu,
} from "lucide-react";

const FILTERS = [
  { label: "All", value: "All", icon: SquareMenu },
  { label: "Sports", value: "Sports", icon: Volleyball },
  { label: "Games", value: "Games", icon: Gamepad },
  { label: "Kid Friendly", value: "Kid Friendly", icon: Baby },
  { label: "Food & Bev", value: "Food & Bev", icon: Utensils },
  { label: "Music", value: "Music", icon: Music },
];

export default function EventFilters({ selectedType, onTypeChange }) {
  return (
    <div className={styles.filterContainer}>
      {FILTERS.map(({ label, value, icon: Icon }) => (
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
      ))}
    </div>
  );
}
