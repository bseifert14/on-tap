import React from "react";
import styles from "../../styles/UserEventTableRow.module.css";
import { format } from "date-fns";
import { Check, Minus } from "lucide-react";

export default function UserEventTableRow({ event, onEdit, onDelete }) {
  const {
    event_name,
    event_date,
    event_location,
    event_description,
    event_photo_url,
    event_external_link, // optional field for link support
  } = event;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "PPPP");
  };

  const truncate = (text, max = 100) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <tr>
      <td className={styles.cell}>{event_name}</td>
      <td className={styles.cell}>{formatDate(event_date)}</td>
      <td className={styles.cell}>{event_location}</td>
      <td className={`${styles.cell} ${styles.truncate}`}>
        {event_description ? truncate(event_description) : "—"}
      </td>
      <td className={styles.cell}>
        {event_photo_url ? (
          <Check className={styles.checkmark} size={16} />
        ) : (
          <Minus className={styles.empty} size={16} />
        )}
      </td>
      <td className={styles.cell}>
        {event_external_link ? (
          <Check className={styles.checkmark} size={16} />
        ) : (
          <Minus className={styles.empty} size={16} />
        )}
      </td>
      <td className={styles.cell}>
        <button className={styles.actionButton} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.actionButton} onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

