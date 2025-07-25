import { useState } from "react";

import "react-calendar/dist/Calendar.css"; // default styles
import "../../styles/react-calendar-custom.css"; // custom overrides
import styles from "../../styles/CalendarView.module.css";

import Calendar from "react-calendar";
import EventModal from "../../components/events/EventModal";
import EventCard from "../../components/events/EventCard";
import EmptyEventsView from "../../components/events/EmptyEventsView";
import useGetCalendarEvents from "../../utils/hooks/useGetCalendarEvents";
import EventCardSkeleton from "../../components/events/EventCardSkeleton";


export default function CalendarView({ selectedType }) {
  const { events, isLoading } = useGetCalendarEvents();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    const selectedDateStr = selectedDate.toISOString().split("T")[0];
  
    const filtered = events.filter(
      (e) =>
        e.event_date === selectedDateStr &&
        (selectedType === "All" || e.event_type === selectedType)
    );
  
    return (
      <div className={styles.container}>
        {/* Left: Calendar */}
        <div className={styles.calendarWrapper}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const dateStr = date.toISOString().split("T")[0];
              const hasEvent = events.some(
                (e) => e.event_date === dateStr && (selectedType === "All" || e.event_type === selectedType)
              );
              const isSelected = dateStr === selectedDate.toISOString().split("T")[0];
              return [
                hasEvent ? styles.hasEvent : "",
                isSelected ? styles.selectedDay : ""
              ].join(" ");
            }
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
            { isLoading && (
              <EventCardSkeleton />
            )}

            { !isLoading && filtered.length === 0 ? (
              <EmptyEventsView currentView="calendar" />
            ) : (
              filtered.map((event) => (
                <EventCard key={event.id} event={event} onSelectEvent={() => setSelectedEvent(event)} />
              ))
            )}
          </div>
        </div>

        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>
    );
  }
