import React from "react";
import styles from "../../styles/UserEventTableRow.module.css";
import { format } from "date-fns";
import { Check, Minus, Pencil, Trash2 } from "lucide-react";

export default function UserEventTableRow({ event, onEdit, onDelete }) {
  const {
    event_name,
    event_start_timestamp,
    event_location,
    event_description,
    event_photo_url,
    event_photo_path,
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
      <td className={`${styles.cell} ${styles.eventNameCell}`}>{event_name}</td>
      <td className={styles.cell}>{formatDate(event_start_timestamp)}</td>
      <td className={styles.cell}>{event_location}</td>
      <td className={`${styles.cell} ${styles.truncate}`}>
        {event_description ? truncate(event_description) : "—"}
      </td>
      <td className={styles.cell}>
        {(event_photo_url || event_photo_path) ? (
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
        <div className={styles.actionButtonContainer}>
          <button className={styles.actionButton} onClick={onEdit}>
            <Pencil size={15} strokeWidth={1.5} />
          </button>
          <button className={`${styles.actionButton} ${styles.delete}`} onClick={onDelete}>
            <Trash2 size={15} strokeWidth={1.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}

