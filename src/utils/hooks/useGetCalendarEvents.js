// src/hooks/useGetCalendarEvents.js
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function useGetCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
        setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date");

      if (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } else {
        setEvents(data);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
}
