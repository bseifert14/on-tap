import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetCalendarDots({ start, end, selectedType, searchTerm } = {}) {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const trimmed = useMemo(() => (searchTerm ?? "").trim(), [searchTerm]);

  useEffect(() => {
    let cancelled = false;

    if (!start || !end) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const dates = await fetchEvents({
          mode: "calendar_dots",
          start,
          end,
          type: selectedType ?? "All",
          q: trimmed,
        });

        if (!cancelled) setDates(dates);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [start, end, selectedType, trimmed]);

  return { dates, isLoading, error };
}
