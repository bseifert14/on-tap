import { useEffect, useRef, useState } from "react";
import styles from "../../styles/EventModal.module.css";
import { Calendar, CircleArrowRight, Locate, MapPin, Navigation } from "lucide-react";
import { formatEventDateTime } from "../../utils/formatDates";
import Modal from "../common/Modal";
import { getAddressURL } from "../../utils/getAddress";
import { getEventImageUrl } from "../../utils/getEventImageUrl";
import EventModalSkeleton from "./EventModalSkeleton";
import emptyEventsView from '/images/site/empty-events-view.png';

export default function EventModal({ event, onClose, isLoading, error }) {

  if (isLoading) {
    return (
      <EventModalSkeleton isLoading={isLoading} onClose={onClose} />
    );
  }

  if (error) {
    return (
      <Modal onClose={onClose}>
        <img src={emptyEventsView} alt="Empty stage" className={styles.errorImage} />
        <div className={styles.errorText}>
          <p>{error}</p>
        </div>
      </Modal>
    );
  }

  if (!event) return null;

  const { event_name, event_location, event_description, 
    event_url, event_start_timestamp, event_end_timestamp, business_url,
    event_business_name, business_name
  } = event;

  const [showFade, setShowFade] = useState(false);
  const descriptionRef = useRef(null);

  function getEventLocation() {
        return event_business_name || business_name;
    }

  function getEventUrl(eventURL, businessURL) {
      if (eventURL) {
        return eventURL?.startsWith("http") ? eventURL : `https://${eventURL}`
      } else if (businessURL) {
        return businessURL?.startsWith("http") ? businessURL : `https://${businessURL}`;
      }

      return '#';
  }

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

  const Image = () => {
    return (
      <img
          src={getEventImageUrl(event)}
          alt={event_name}
          className={styles.image}
        />
    );
  }

  const Footer = () => {
    return (
      <div className={styles.modalFooter}>
        <a href={getEventUrl(event_url, business_url)} className={styles.button} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
    );
  }

  return (
    <Modal
      onClose={onClose}
      image={<Image />}
      footer={<Footer />}
      isLoading={isLoading}
    >
      <h2 className={styles.title}>{event_name}</h2>
      <div className={styles.iconValuePair}>
          <MapPin size={15} strokeWidth={1.5} color="#092a34" />
          <a
            href={getAddressURL(event_location)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.value}
            aria-label={`Get directions to ${business_name}`}
          >
            <span className={styles.iconValuePair}>
              {getEventLocation()}
              <CircleArrowRight size={13} strokeWidth={1.5} color="#092a34" />
            </span>
          </a>
      </div>
      <div className={styles.iconValuePairTime}>
          <Calendar size={15} strokeWidth={1.5} color="#092a34" />
          <div className={styles.value}>{formatEventDateTime(event_start_timestamp, event_end_timestamp)}</div>
      </div>
      <div
        ref={descriptionRef}
        className={`${styles.descriptionWrapper} ${!event_description || !event_description.trim() ? styles.empty : showFade ? "" : styles.noFade}`}
      >
        <p className={styles.description}>
          {event_description?.trim() || <span className={styles.placeholder}>No description available</span>}
        </p>
      </div>
    </Modal>
  );
}
