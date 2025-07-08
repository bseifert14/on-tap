import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import EventTable from "../components/EventTable";
import ViewControls from "../components/ViewControls";
import styles from "../styles/Home.module.css";
import EventModal from "../components/EventModal";

export default function Home() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString().split("T")[0]) // today or later
        .order("event_date", { ascending: true });
      if (error) console.error("Error fetching events:", error);
      else setEvents(data);
    };
    fetchEvents();
  }, []);

  const filtered = selectedType === "All"
    ? events
    : events.filter(e => e.event_type === selectedType);

  return (
    <div className={styles.homeBody}>
      <ViewControls
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        currentView="list"
      />
      <EventTable events={filtered} onSelectEvent={(event) => setSelectedEvent(event)}/>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
