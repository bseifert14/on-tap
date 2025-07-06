// components/CalendarView.jsx
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles
import "../styles/react-calendar-custom.css"; // your custom overrides
import { supabase } from "../supabase";
import styles from "../styles/CalendarView.module.css";
import EventCard from "./EventCard";

const EVENT_ICONS = {
  Music: "🎵",
  Sports: "⚽",
  Games: "🎮",
  "Kid Friendly": "👶",
  "Food & Bev": "🍔"
};

export default function CalendarView({ selectedType }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
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
          <h3>
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
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
