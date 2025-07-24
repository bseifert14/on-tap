import { useEffect, useRef, useState } from "react";
import styles from "../../styles/EventModal.module.css";
import { Calendar, MapPin } from "lucide-react";
import { formatEventDateTime } from "../../utils/formatDates";
import { getDefaultImage } from "../../utils/getDefaultImage";

export default function EventModal({ event, onClose }) {
  if (!event) return null;
  const { event_name, event_location, event_date, event_description, event_photo_url, event_type, event_url, event_start_timestamp } = event;
  const [showFade, setShowFade] = useState(false);
  const descriptionRef = useRef(null);
  const safeUrl = event_url?.startsWith("http") ? event_url : `https://${event_url}`;
  useEffect(() => {
    const el = descriptionRef.current;
  
    const handleScroll = () => {
      if (!el) return;
  
      const hasOverflow = el.scrollHeight > el.clientHeight;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
  
      setShowFade(hasOverflow && !atBottom);
    };
  
    if (el) {
      handleScroll(); // Initial state
      el.addEventListener("scroll", handleScroll);
    }
  
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className={styles.modalBody}>
            <h2 className={styles.title}>{event_name}</h2>
            <div className={styles.iconValuePair}>
                <MapPin size={15} strokeWidth={1.5} color="#999" />
                <div className={styles.value}>{event_location}</div>
            </div>
            <div className={styles.iconValuePairTime}>
                <Calendar size={15} strokeWidth={1.5} color="#999" />
                <div className={styles.value}>{formatEventDateTime(event_start_timestamp)}</div>
            </div>
            <div
              ref={descriptionRef}
              className={`${styles.descriptionWrapper} ${!event_description || !event_description.trim() ? styles.empty : showFade ? "" : styles.noFade}`}
            >
              <p className={styles.description}>
                {event_description?.trim() || <span className={styles.placeholder}>No description available</span>}
              </p>
            </div>
          </div>
          
        </div>
        <div className={styles.modalFooter}>
            <>
              <div className={styles.divider} />
              {event_url && (
                <a href={safeUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              )}
            </>
          </div>
      </div>
    </>
  );
}
