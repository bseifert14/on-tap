import EventCard from "./EventCard";
import EmptyEventsView from "./EmptyEventsView";
import styles from "../../styles/EventList.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export default function EventList({ events, onSelectEvent, selectedType }) {
  const isMobile = useMediaQuery("(max-width: 975px)");
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
    <div className={!isMobile ? styles.eventsContainer : ""}>
      {filtered.map((event, index) => (
        <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
}
