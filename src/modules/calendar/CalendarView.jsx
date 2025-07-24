import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

import styles from "../../styles/CalendarView.module.css";
import "react-calendar/dist/Calendar.css"; // default styles
import "../../styles/react-calendar-custom.css"; // your custom overrides

import Calendar from "react-calendar";
import EventModal from "../../components/events/EventModal";
import EventCard from "../../components/events/EventCard";


export default function CalendarView({ selectedType }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date");
  
        if (error) console.error("Error fetching events:", error);
        else setEvents(data);
      };
  
      fetchEvents();
    }, []);
  
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
            {filtered.length === 0 ? (
              <p>No events for this day.</p>
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
