import EventCard from "./EventCard";
import EmptyEventsView from "./EmptyEventsView";
import styles from "../../styles/EventList.module.css";

export default function EventList({ events, onSelectEvent, currentView }) {

  if (events.length === 0) {
    return (
      <EmptyEventsView currentView={currentView} />
    )
  }

  return (
    <div className={styles.eventsContainer}>
      {events.map((event, index) => (
        <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
}
