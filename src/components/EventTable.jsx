import React from "react";
import styles from "../styles/EventTable.module.css";
import { getDefaultImage } from "../utils/getDefaultImage";
import { SquareArrowUpRight } from "lucide-react";
import { getIcon } from "../utils/getIcon";

export default function EventTable({ events = [], onSelectEvent }) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.thIcon} />
          <th className={styles.th} />
          <th className={styles.th}>Event</th>
          <th className={styles.th}>Location & Time</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className={styles.row}>
            <td className={styles.tdIcon}>
              {React.createElement(getIcon(event.event_type), { size: 18, strokeWidth: 1.5 })}
            </td>
            <td className={styles.imageCell}>
              <img
                src={event.event_photo_url || getDefaultImage(event.event_type)}
                alt={event.event_name}
                className={styles.eventImage}
              />
            </td>
            <td className={styles.td}>
              <div className={styles.eventName}>
                {event.event_name}
              </div>
            </td>
            <td className={styles.td}>
              <div className={styles.locationTime}>
                <span>{event.event_location}</span>
                <br />
                <span>{formatDate(event.event_date)}</span>
              </div>
            </td>
            <td className={styles.actionCell}>
              <div className={styles.actions}>
                <button
                  className={styles.infoButton}
                  onClick={() => onSelectEvent?.(event)}
                >
                  More Info
                </button>
                <button
                  className={styles.dotsButton}
                  onClick={() => onSelectEvent?.(event)}
                >
                  <SquareArrowUpRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const formatDate = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};
