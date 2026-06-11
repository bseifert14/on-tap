import EventCard from "./EventCard";
import EventCardCompact from "./EventCardCompact";
import EmptyEventsView from "./EmptyEventsView";
import styles from "../../styles/EventList.module.css";
import { Event, ViewType } from "../../types";

interface EventListProps {
    events: Event[];
    onSelectEvent?: (event: Event) => void;
    currentView: ViewType;
    selectedType?: string;
}

export default function EventList({ events, onSelectEvent, currentView, selectedType }: EventListProps) {

  if (events.length === 0) {
    return (
      <EmptyEventsView currentView={currentView} />
    )
  }

  const isCompact = selectedType === "fitness"
  const eventListClass = isCompact ? styles.compactList : styles.eventsContainer;
  
  return (
    <div className={eventListClass}>
      {events.map((event, index) => {
        return isCompact ?
          <EventCardCompact key={index} event={event} onSelectEvent={onSelectEvent} /> :
          <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      })}
    </div>
  );
}
