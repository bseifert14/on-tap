import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import EventTable from "../components/EventTable";

const EVENT_TYPES = [
    { label: "All", icon: "🧭" },
    { label: "Music", icon: "🎵" },
    { label: "Sports", icon: "⚽" },
    { label: "Kid Friendly", icon: "🧒" },
    { label: "Food & Bev", icon: "🍔" }
  ];
  

export default function Landing() {
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*").order("event_date");
      if (error) console.error(error);
      else setEvents(data);
    };
    fetchEvents();
  }, []);

  const filteredEvents =
    selectedType === "All"
      ? events
      : events.filter((e) => e.event_type === selectedType);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {EVENT_TYPES.map(({ label, icon }) => (
            <button
            key={label}
            onClick={() => setSelectedType(label)}
            style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: selectedType === label ? "#D80032" : "#eee",
                color: selectedType === label ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px"
            }}
            >
            <span>{icon}</span>
            <span>{label}</span>
            </button>
        ))}
    </div>
      {/* Events Table */}
      <EventTable events={filteredEvents} />
    </div>
  );
}
