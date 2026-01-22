import { useMemo, useState } from "react";
import Calendar from "react-calendar";

import styles from "../../styles/CalendarView.module.css";
import "../../styles/react-calendar-custom.css"; // custom overrides
import useGetCalendarEvents from "../../utils/hooks/useGetCalendarEvents";

import EventModal from "../../components/events/EventModal";
import EventCard from "../../components/events/EventCard";
import EmptyEventsView from "../../components/events/EmptyEventsView";
import EventCardSkeleton from "../../components/events/EventCardSkeleton";

function toDateKeyLocal(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function monthRangeKeys(activeStartDate) {
  const start = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
  const end = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0); // last day of month
  return { startKey: toDateKeyLocal(start), endKey: toDateKeyLocal(end) };
}

export default function CalendarView({ selectedType }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { startKey, endKey } = useMemo(
    () => monthRangeKeys(activeStartDate),
    [activeStartDate]
  );

  const { events, isLoading, error } = useGetCalendarEvents({
    start: startKey,
    end: endKey,
  });

  const selectedDateStr = toDateKeyLocal(selectedDate);

  // Build a date -> events[] map and a date set for fast lookups
  const eventsByDate = useMemo(() => {
    const map = new Map();

    for (const e of events) {
      if (selectedType !== "All" && e.event_type !== selectedType) continue;

      const key = e.event_date; // already 'YYYY-MM-DD' from DB
      const arr = map.get(key);
      if (arr) arr.push(e);
      else map.set(key, [e]);
    }

    return map;
  }, [events, selectedType]);

  const datesWithEvents = useMemo(() => new Set(eventsByDate.keys()), [eventsByDate]);

  const filtered = eventsByDate.get(selectedDateStr) ?? [];

  return (
    <div className={styles.container}>
      {/* Left: Calendar */}
      <div className={styles.calendarWrapper}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          tileClassName={({ date, view }) => {
            if (view !== "month") return "";

            const dateStr = toDateKeyLocal(date);
            const hasEvent = datesWithEvents.has(dateStr);
            const isSelected = toDateKeyLocal(date) === selectedDateStr;

            return [
              hasEvent ? styles.hasEvent : "",
              isSelected ? styles.selectedDay : "",
            ].join(" ");
          }}
        />
      </div>

      {/* Right: Events */}
      <div className={styles.eventsWrapper}>
        <h3 className={styles.eventsHeader}>
          Events on{" "}
          {selectedDate.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>

        <div className={styles.eventScrollArea}>
          {isLoading && <EventCardSkeleton />}

          {!isLoading && filtered.length === 0 ? (
            <EmptyEventsView currentView="calendar" />
          ) : (
            filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelectEvent={() => setSelectedEvent(event)}
              />
            ))
          )}

          {error && (
            <div style={{ padding: 12 }}>
              Something went wrong loading events.
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
