import { useEffect, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetCalendarEvents({ start, end, search } = {}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (!start || !end) {
      setIsLoading(false);
      return;
    }

    const trimmed = (search ?? "").trim();

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchEvents({
          mode: "calendar",
          start,
          end,
          q: trimmed,
          limit: "500",
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
  }, [start, end, search]);

  return { events, isLoading, error };
}
