import React from "react";
import styles from "../../styles/revamp/EventCard.module.css";
import { getDefaultImage } from "../../utils/getDefaultImage";
import { getIcon } from "../../utils/getIcon";
import { Baby, Calendar, CircleAlert, MapPin } from "lucide-react";

function getAgeClassification(is_kid_friendly, is_18_plus, is_21_plus) {
    // if (is_kid_friendly) {
    //     return (
    //         <div className={`${styles.category} ${styles.kidFriendly}`}>
    //             <Baby size={15} strokeWidth={1.5} />
    //             Kid Friendly
    //         </div>
    //     )
    // } else
     if (is_18_plus) {
        return (
            <div className={styles.category}>
                <CircleAlert size={15} strokeWidth={1.5} />
                18+ Only
            </div>
        )
    } else if (is_21_plus) {
        return (
            <div className={styles.category}>
                <CircleAlert size={15} strokeWidth={1.5} />
                21+ Only
            </div>
        )
    }
}

export default function EventCard({ event, onSelectEvent }) {
    const { event_date, event_description, event_location, event_name, event_photo_url, 
        event_type, is_kid_friendly, is_18_plus, is_21_plus
    } = event;
    // console.log(event);
  return (
    <div className={styles.card}>
      <img src={event_photo_url || getDefaultImage(event_type)} alt={event_name} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.categoryContainer}>
            <div className={styles.category}>
                {React.createElement(getIcon(event_type), { size: 15, strokeWidth: 1.5 })}
                {event_type}
            </div>
            {/* { getAgeClassification(is_kid_friendly, is_18_plus, is_21_plus) } */}
        </div>
        <h3 className={styles.title}>{event_name}</h3>
        <p className={styles.description}>{event_description}</p>
        {/* <div className={styles.categoryContainer}>
            <div className={styles.category}>
                {React.createElement(getIcon(event_type), { size: 15, strokeWidth: 1.5 })}
                {event_type}
            </div>
            { getAgeClassification(is_kid_friendly, is_18_plus, is_21_plus) }
        </div> */}
        <div className={styles.details}>
            <div className={styles.iconValuePair}>
                <MapPin size={15} strokeWidth={1.5} color="#999" />
                <div className={styles.value}>{event_location}</div>
            </div>
            <div className={styles.iconValuePair}>
                <Calendar size={15} strokeWidth={1.5} color="#999" />
                <div className={styles.value}>{event_date}</div>
            </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.ticketButton} onClick={() => onSelectEvent?.(event)}>See Details</button>
      </div>
    </div>
  );
}
