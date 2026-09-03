import React from "react";
import { format } from "date-fns";
import { Camera, Link as LinkIcon } from "lucide-react";

import styles from "../../styles/UserEventTableRow.module.css";
import EventRowActions from "./EventRowActions";

export default function UserEventTableRow({ event, onEdit, onDelete }) {
  const {
    event_name,
    event_start_timestamp,
    event_end_timestamp,
    event_date,
    event_description,
    event_photo_url,
    event_photo_path,
    event_url,
  } = event;

  const formatDate = (startTimestamp, dateOnly) => {
    const source = startTimestamp || dateOnly;
    return source ? format(new Date(source), "PPPP") : "—";
  };

  const formatTimeRange = (startTimestamp, endTimestamp) => {
    if (!startTimestamp) return null;
    const start = format(new Date(startTimestamp), "h:mma");
    if (!endTimestamp) return start;
    return `${start} - ${format(new Date(endTimestamp), "h:mma")}`;
  };

  const timeRange = formatTimeRange(event_start_timestamp, event_end_timestamp);

  const truncate = (text, max = 100) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  const hasPhoto = Boolean(event_photo_url || event_photo_path);
  const hasLink = Boolean(event_url);

  return (
    <tr>
      <td className={`${styles.cell} ${styles.eventNameCell} ${styles.stickyLeft}`}>
        {event_name}
      </td>
      <td className={styles.cell}>
        <div className={styles.dateCell}>
          <span>{formatDate(event_start_timestamp, event_date)}</span>
          {timeRange && <span className={styles.dateCellTime}>{timeRange}</span>}
        </div>
      </td>
      <td className={`${styles.cell} ${styles.truncate}`}>
        {event_description ? truncate(event_description) : "—"}
      </td>
      <td className={styles.cell}>
        <div className={styles.mediaCell}>
          <Camera
            size={16}
            strokeWidth={1.5}
            className={hasPhoto ? styles.mediaOn : styles.mediaOff}
            aria-label={hasPhoto ? "Photo attached" : "No photo"}
          />
          <LinkIcon
            size={16}
            strokeWidth={1.5}
            className={hasLink ? styles.mediaOn : styles.mediaOff}
            aria-label={hasLink ? "Link attached" : "No link"}
          />
        </div>
      </td>
      <td className={`${styles.cell} ${styles.actionsCell}`}>
        <EventRowActions onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
