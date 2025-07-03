// components/CalendarView.jsx
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles
import "../styles/react-calendar-custom.css"; // your custom overrides
import { supabase } from "../supabase";
import styles from "../styles/CalendarView.module.css";

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
          <Calendar onChange={setSelectedDate} value={selectedDate} />
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
  
          {filtered.length === 0 ? (
            <p>No events for this day.</p>
          ) : (
            <div className={styles.eventList}>
              {filtered.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventTitle}>
                    {EVENT_ICONS[event.event_type] || "📌"} {event.event_name}
                  </div>
                  <div className={styles.eventLocation}>
                    {event.event_location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
