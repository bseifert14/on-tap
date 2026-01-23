import { useEffect, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetListEvents({ search = "" } = {}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const trimmed = search.trim();

        const params =
          trimmed.length >= 2
            ? { mode: "search", q: trimmed, limit: "50" }
            : { mode: "list", from: new Date().toISOString().split("T")[0], limit: "50" };

        const data = await fetchEvents(params);
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
  }, [search]);

  return { events, isLoading, error };
}
