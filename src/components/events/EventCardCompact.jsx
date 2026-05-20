import React from "react";
import styles from "../../styles/EventCardCompact.module.css";
import { ArrowRight } from "lucide-react";
import { getEventDate } from "../../utils/formatDates";
import { format, parseISO } from "date-fns";
import { getIconForSlug } from "../../constants/eventTypes";

// Clean this function up
function formatEventMeta(start_time, business_name) {
    if (!start_time && !business_name) return "";
    if (!start_time) return business_name;

    const startDate = parseISO(start_time);
    const startTimeStr = format(startDate, 'h:mm a');

    if (!business_name) return startTimeStr;
    return `${startTimeStr} • ${business_name}`;
}

export default function EventCardCompact({ event, onSelectEvent }) {
  const { event_name, event_date, event_start_timestamp,
    event_business_name, business_name, event_type, event_type_slug
  } = event;

  const { month, day } = getEventDate(event_date);

  function getEventLocation() {
    return event_business_name || business_name;
  }

  return (
    <button className={styles.card} onClick={() => onSelectEvent?.(event)}>
      <div className={styles.dateBadge}>
        <div className={styles.dateMonth}>{month}</div>
        <div className={styles.dateDay}>{day}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>{event_name}</div>
        <div className={styles.eventType}>
            {React.createElement(getIconForSlug(event_type_slug), { size: 12, strokeWidth: 1.5 })}
            {event_type}
        </div>
        <div className={styles.meta}>
            {formatEventMeta(event_start_timestamp, getEventLocation())}
        </div>
    </div>

      <div className={styles.action}>
        Details
        <ArrowRight size={13} strokeWidth={1.5} />
      </div>
    </button>
  );
}