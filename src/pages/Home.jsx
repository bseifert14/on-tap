import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import EventTable from "../components/EventTable";
// import EventViewControls from "../components/EventViewControls";
import ViewControls from "../components/ViewControls";

export default function Home() {
  const [selectedType, setSelectedType] = useState("All");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) console.error("Error fetching events:", error);
      else setEvents(data);
    };
    fetchEvents();
  }, []);

  const filtered = selectedType === "All"
    ? events
    : events.filter(e => e.event_type === selectedType);

  return (
    <div>
      <ViewControls
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        currentView="list"
      />
      <EventTable events={filtered} />
    </div>
  );
}
