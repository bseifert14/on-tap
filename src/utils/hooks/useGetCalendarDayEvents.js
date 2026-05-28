import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";
import { getTypeInParam } from "../../constants/eventTypes";

export default function useGetCalendarDayEvents({
  date,
  selectedType = "All",
  searchTerm = "",
  pageSize = 12,
} = {}) {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const trimmed = useMemo(() => (searchTerm ?? "").trim(), [searchTerm]);

  const typeList = useMemo(() => getTypeInParam(selectedType), [selectedType]);
  const typeIn = useMemo(() => (typeList ? typeList.join(",") : ""), [typeList]);

  useEffect(() => {
    setEvents([]);
    setOffset(0);
    setHasMore(true);
  }, [date, trimmed, typeIn]); // use typeIn

  useEffect(() => {
    let cancelled = false;

    if (!date) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        setError(null);
        if (offset === 0) setIsLoading(true);
        else setIsLoadingMore(true);

        const params = {
          mode: "day",
          date,
          q: trimmed,
          limit: String(pageSize),
          offset: String(offset),
          ...(typeIn ? { type_in: typeIn } : {}), // important
        };

        const data = await fetchEvents(params);

        if (cancelled) return;

        setEvents((prev) => (offset === 0 ? data : [...prev, ...data]));
        setHasMore(Array.isArray(data) && data.length === pageSize);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [date, trimmed, typeIn, offset, pageSize]);

  const loadMore = () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    setOffset((prev) => prev + pageSize);
  };

  return { events, isLoading, isLoadingMore, hasMore, loadMore, error };
}
