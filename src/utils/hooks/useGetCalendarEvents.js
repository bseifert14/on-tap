import { useEffect, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetCalendarEvents({ start, end } = {}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!start || !end) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents({
          mode: "calendar",
          start,
          end,
          limit: "200",
        });
        if (!cancelled) setEvents(data);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [start, end]);

  return { events, isLoading, error };
}
