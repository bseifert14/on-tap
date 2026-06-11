import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";
import { getTypeInParam } from "../../constants/eventTypes";

interface UseGetCalendarDotsParams {
  start?: string;
  end?: string;
  selectedType?: string | string[];
  searchTerm?: string;
}

export default function useGetCalendarDots({ start, end, selectedType = "All", searchTerm }: UseGetCalendarDotsParams = {}) {
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)));
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
