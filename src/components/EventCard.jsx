import { MoveUpRight, SquareArrowOutUpRight } from "lucide-react";
import styles from "../styles/EventCard.module.css";
import { getDefaultImage } from "../utils/getDefaultImage";
import { getIcon } from "../utils/getIcon";

export default function EventCard({ event, onClick }) {
  const { event_date, event_description, event_location, event_name, event_photo_url, event_type } = event;
  const IconComponent = getIcon(event_type);

  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={event_photo_url || getDefaultImage(event_type)}
        alt={event_name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>
          {event_name}
        </h3>
        <p className={styles.location}>{event_location} • {event_date}</p>
        <p className={styles.description}>
          {event_description}
        </p>
      </div>
      <IconComponent size={18} strokeWidth={1.5} />
      <div className={styles.icon}>
        <SquareArrowOutUpRight size={18} strokeWidth={1.5} />
      </div>
    </div>
  );
}
