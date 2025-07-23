import React from "react";
import EventCard from "../../components/EventCard";

export default function EventList({ events, onSelectEvent, selectedType }) {
  const filtered = events.filter(
    (e) =>
      (selectedType === "All" || e.event_type === selectedType)
  );

  return (
    <div>
      {filtered.map((event, index) => (
        <EventCard key={index} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
}
