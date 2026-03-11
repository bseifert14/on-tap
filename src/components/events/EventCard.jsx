import React from "react";
import styles from "../../styles/EventCard.module.css";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { formatEventStartTime, getEventDate } from "../../utils/formatDates";
import { getEventImageUrl } from "../../utils/getEventImageUrl";
import { getIconForSlug } from "../../constants/eventTypes";

export default function EventCard({ event, onSelectEvent }) {
    const { event_description, event_location, event_name, event_date, 
        event_type, event_type_slug, event_start_timestamp, event_min_age, 
        event_business_name, business_name
    } = event;

    const { month, day } = getEventDate(event_date);

    function getEventLocation() {
        return event_business_name || business_name;
    }

    return (
        <button className={styles.card} onClick={() => onSelectEvent?.(event)}>
            <div className={styles.cardImageWrapper}>
                <img src={getEventImageUrl(event)} alt={event_name} />
                <div className={styles.cardDateBadge}>
                    <div className={styles.cardDateMonth}>{month}</div>
                    <div className={styles.cardDateDay}>{day}</div>
                </div>
                <div className={styles.cardVenueTag}>
                    <MapPin size={15} strokeWidth={1.5} />
                    {getEventLocation()}
                </div>
            </div>

            <div className={styles.cardBody}>
                <div className={styles.cardCategory}>
                    {React.createElement(getIconForSlug(event_type_slug), { size: 15, strokeWidth: 1.5 })}
                    {event_type}
                </div>
                <div className={styles.cardTitle}>{event_name}</div>
                <div className={styles.cardDescription}>{event_description}</div>
                <div className={styles.cardFooter}>
                    {event_start_timestamp && (
                        <div className={styles.cardMeta}>
                            <Clock size={15} strokeWidth={1.5} />
                            {formatEventStartTime(event_start_timestamp)}
                        </div>
                    )}
                    <div className={styles.cardAction}>
                        Details
                        <ArrowRight size={15} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </button>
    );
}
