import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    supabase.from("events").select("*").then(({ data, error }) => {
      if (error) alert("Error loading events");
      else setEvents(data);
    });
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(e => <li key={e.id}>{e.title}</li>)}
      </ul>
    </div>
  );
}
