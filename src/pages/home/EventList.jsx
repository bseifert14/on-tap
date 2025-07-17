import React from "react";
import EventCard from "../../components/EventCard";

export default function EventList({ events, onSelectEvent }) {
  return (
    <div>
      {events.map((event, index) => (
        <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
}
