import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function useGetListEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // for skeleton
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString().split("T")[0])
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } else {
        const normalized = data.map(event => ({
          ...event,
          business_name: event.businesses?.name || null,
        }));
        setEvents(normalized);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
}
