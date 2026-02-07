import EventCard from "./EventCard";
import EmptyEventsView from "./EmptyEventsView";
import styles from "../../styles/EventList.module.css";

export default function EventList({ events, onSelectEvent, selectedType }) {
  const filtered = events.filter(
    (e) =>
      (selectedType === "All" || e.event_type === selectedType)
  );

  if (filtered.length === 0 || events.length === 0) {
    return (
      <EmptyEventsView currentView="list" />
    )
  }

  return (
    <div className={styles.eventsContainer}>
      {filtered.map((event, index) => (
        <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
}
