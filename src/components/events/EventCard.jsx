import React from "react";
import styles from "../../styles/EventCard.module.css";
import { getDefaultImage } from "../../utils/getDefaultImage";
import { getIcon } from "../../utils/getIcon";
import { Clock, MapPin } from "lucide-react";
import { formatEventStartTime } from "../../utils/formatDates";
import Button from "../common/Button";
import { getAddressURL } from "../../utils/getAddress";
import { getEventImageUrl } from "../../utils/getEventImageUrl";

function getEventDate(dateStr) {
    const date = new Date(`${dateStr}T00:00:00`);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return { month, day };
}

export default function EventCard({ event, onSelectEvent }) {
    const { event_description, event_location, event_name, event_date, 
        event_type, event_start_timestamp, event_min_age, event_business_name, business_name
    } = event;
    
    const { month, day } = getEventDate(event_date);

    function getEventLocation() {
        return event_business_name || business_name;
    }

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={getEventImageUrl(event)} alt={event_name} className={styles.image} />
                <div className={styles.dateWidget}>
                    <div className={styles.dateWidgetMonth}>{month}</div>
                    <div className={styles.dateWidgetDay}>{day}</div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.categoryContainer}>
                    <div className={styles.category}>
                        {React.createElement(getIcon(event_type), { size: 15, strokeWidth: 1.5 })}
                        {event_type}
                    </div>

                    {event_min_age ? 
                        <div className={styles.category}>
                            Age: {event_min_age}+
                        </div>
                    : null}
                </div>

                <h3 className={styles.title}>{event_name}</h3>
                <p className={styles.description}>{event_description}</p>
                <div className={styles.details}>
                    <div className={styles.iconValuePair}>
                        <Clock size={15} strokeWidth={1.5} />
                        <div className={styles.value}>{formatEventStartTime(event_start_timestamp)}</div>
                    </div>
                    <div className={styles.iconValuePair}>
                        <MapPin size={15} strokeWidth={1.5} />
                        <a
                            href={getAddressURL(event_location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.value}
                            aria-label={`Get directions to ${business_name}`}
                        >
                            {getEventLocation()}
                        </a>
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
