import styles from "../styles/EventModal.module.css";
import { getDefaultImage } from "../utils/getDefaultImage";

export default function EventModal({ event, onClose }) {
  if (!event) return null;

  const { event_name, event_location, event_date, event_description, event_photo_url, event_type, event_link } = event;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <img
          src={event_photo_url || getDefaultImage(event_type)}
          alt={event_name}
          className={styles.image}
        />
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <div className={styles.content}>
          <h2 className={styles.title}>{event_name}</h2>
          <p className={styles.subtext}>{event_location} • {event_date}</p>
          <p className={styles.description}>{event_description}</p>
          {event_link && (
            <a href={event_link} className={styles.button} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          )}
        </div>
      </div>
    </>
  );
}
