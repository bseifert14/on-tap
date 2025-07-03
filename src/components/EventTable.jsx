import React from "react";
import styles from "../styles/EventTable.module.css";

const ICONS = {
  Music: "🎵",
  Sports: "⚽",
  "Kid Friendly": "🧒",
  "Food & Bev": "🍔"
};

export default function EventTable({ events = [] }) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Events</th>
          <th className={styles.th}>Location & Time</th>
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className={styles.row}>
            <td className={styles.td}>
              <div className={styles.eventName}>
                <span className={styles.iconCell}>{ICONS[event.event_type] || "📍"}</span>
                <span>{event.event_name}</span>
              </div>
            </td>
            <td className={styles.td}>
              <div className={styles.locationTime}>
                <span>{event.event_location}</span>
                <br />
                <span>{formatDate(event.event_date)}</span>
              </div>
            </td>
            <td className={styles.td}>
              <div className={styles.actions}>
                <button className={styles.infoButton}>More Info</button>
                <button className={styles.dotsButton}>⋯</button>
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
