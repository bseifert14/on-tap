import React from "react";
import styles from "../../styles/EventCard.module.css";
import { getDefaultImage } from "../../utils/getDefaultImage";
import { getIcon } from "../../utils/getIcon";
import { Calendar, MapPin } from "lucide-react";
import { formatEventDateTime } from "../../utils/formatDates";
import Button from "../common/Button";

export default function EventCard({ event, onSelectEvent }) {
    const { event_description, event_location, event_name, event_photo_url, 
        event_type, event_start_timestamp, event_end_timestamp 
    } = event;

    return (
        <div className={styles.card}>
        <img src={event_photo_url || getDefaultImage(event_type)} alt={event_name} className={styles.image} />

        <div className={styles.content}>
            <div className={styles.categoryContainer}>
                <div className={styles.category}>
                    {React.createElement(getIcon(event_type), { size: 15, strokeWidth: 1.5 })}
                    {event_type}
                </div>
            </div>
            <h3 className={styles.title}>{event_name}</h3>
            <p className={styles.description}>{event_description}</p>
            <div className={styles.details}>
                <div className={styles.iconValuePair}>
                    <Calendar size={15} strokeWidth={1.5} color="#999" />
                    <div className={styles.value}>{formatEventDateTime(event_start_timestamp, event_end_timestamp)}</div>
                </div>
                <div className={styles.iconValuePair}>
                    <MapPin size={15} strokeWidth={1.5} color="#999" />
                    <div className={styles.value}>{event_location}</div>
                </div>
            </div>
        </div>

        <div className={styles.buttons}>
            <Button onClick={() => onSelectEvent?.(event)}>
                See Details
            </Button>
        </div>
        </div>
    );
}
