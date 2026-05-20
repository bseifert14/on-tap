import React, { useEffect } from "react";
import styles from "../../styles/EventModal.module.css";
import { ArrowRight, Calendar, CircleArrowRight, MapPin, Share } from "lucide-react";
import { formatEventDate, formatEventDateTime, getEventDate } from "../../utils/formatDates";
import Modal from "../common/Modal";
import { getAddressURL } from "../../utils/getAddress";
import { getEventImageUrl } from "../../utils/getEventImageUrl";
import EventModalSkeleton from "./EventModalSkeleton";
import emptyEventsView from '/images/site/empty-events-view.png';
import { useShareEvent } from "../../utils/hooks/useShareEvent";
import { getIconForSlug } from "../../constants/eventTypes";
import useTrackClick from "../../utils/data-tracking/useTrackClick";

export default function EventModal({ event, onClose, isLoading, error }) {
  const { shareEvent, toastVisible } = useShareEvent();
  const { trackClick } = useTrackClick();

  useEffect(() => {
    if (event) {
      trackClick("modal_open", event);
    }
  }, [event]); 

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

  const { event_name, event_location, event_description, event_date, event_type,
    event_type_slug, event_url, event_start_timestamp, event_end_timestamp, business_url,
    event_business_name, business_name
  } = event;

  const { month, day } = getEventDate(event_date);

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

  function handleOnShareClick(event) {
    shareEvent(event);
    trackClick("share", event);
  }

  const Hero = () => {
    return (
      <>
        <img
          src={getEventImageUrl(event)}
          alt={event_name}
          className={styles.image}
        />
        <div className={styles.heroDateBadge}>
          <div className={styles.heroDateMonth}>{month}</div>
          <div className={styles.heroDateDay}>{day}</div>
        </div>
        <div className={styles.heroCategory}>
          {React.createElement(getIconForSlug(event_type_slug), { size: 15, strokeWidth: 1.5 })}
          {event_type}
        </div>
      </>
    );
  }

  const Footer = () => {
    return (
      <>
        <a
          href={getEventUrl(event_url, business_url)}
          className={styles.footerBtnPrimary}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick("learn_more", event)}
        >
          Learn More
          <ArrowRight size={15} strokeWidth={1.5} color="white" />
        </a>
        <button onClick={() => handleOnShareClick(event)} className={styles.footerBtnShare}>
          <Share size={15} strokeWidth={1.5} color="white" />
        </button>
      </>
    );
  }

  return (
    <Modal
      onClose={onClose}
      hero={<Hero />}
      footer={<Footer />}
      isLoading={isLoading}
    >
      {toastVisible && <div className={styles.toast}>Link copied!</div>}
      <h2 className={styles.title}>{event_name}</h2>
      <div className={styles.eventMetaGrid}>
        <div className={styles.eventMetaItem}>
          <div className={styles.eventMetaIcon}>
            <Calendar size={15} strokeWidth={1.5} color="white" />
          </div>
          <div className={styles.eventMetaText}>
            { event_start_timestamp ? (
              <>
                <div className={styles.eventMetaLabel}>DATE & TIME</div>
                <div className={styles.eventMetaValue}>
                  {formatEventDateTime(event_start_timestamp, event_end_timestamp)}
                </div>
              </>
            ) : (
              <>
                <div className={styles.eventMetaLabel}>DATE</div>
                <div className={styles.eventMetaValue}>
                  {formatEventDate(event_date)}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.eventMetaItem}>
          <div className={styles.eventMetaIcon}>
            <MapPin size={15} strokeWidth={1.5} color="white" />
          </div>
          <div className={styles.eventMetaText}>
            <div className={styles.eventMetaLabel}>LOCATION</div>
            <a
              href={getAddressURL(event_location)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.eventMetaValue}
              aria-label={`Get directions to ${business_name}`}
              onClick={() => trackClick("directions", event)}
            >
              {getEventLocation()}
              <CircleArrowRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.eventDescriptionHeader}>ABOUT THIS EVENT</div>
      <div className={styles.eventDescriptionText}>
        {event_description || <span className={styles.placeholder}>No description available</span>}
      </div>
    </Modal>
  );
}
