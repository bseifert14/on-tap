import { useEffect, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetListEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchEvents({ mode: "list", from: today, limit: "50" });
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
  }, []);

  return { events, isLoading, error };
}
