import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";
import { getTypeInParam } from "../../constants/eventTypes";

export default function useGetCalendarDots({ start, end, selectedType = "All", searchTerm } = {}) {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const trimmed = useMemo(() => (searchTerm ?? "").trim(), [searchTerm]);

  const typeList = useMemo(() => getTypeInParam(selectedType), [selectedType]);
  const typeIn = useMemo(() => (typeList ? typeList.join(",") : ""), [typeList]);

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

        const params = {
          mode: "calendar_dots",
          start,
          end,
          q: trimmed,
          ...(typeIn ? { type_in: typeIn } : {}), // important
        };

        const dates = await fetchEvents(params);

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
  }, [start, end, trimmed, typeIn]);

  return { dates, isLoading, error };
}
