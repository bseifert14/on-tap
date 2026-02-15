import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";

export default function useGetListEvents({ search = "", pageSize = 12 } = {}) {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState(null);

  const trimmed = useMemo(() => search.trim(), [search]);

  // Reset when search changes
  useEffect(() => {
    setEvents([]);
    setOffset(0);
    setHasMore(true);
  }, [trimmed]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setError(null);

        // If offset is 0, it's a fresh load
        if (offset === 0) setIsLoading(true);
        else setIsLoadingMore(true);

        const params =
          trimmed.length >= 2
            ? { mode: "search", q: trimmed, limit: String(pageSize), offset: String(offset) }
            : {
                mode: "list",
                from: new Date().toISOString().split("T")[0],
                limit: String(pageSize),
                offset: String(offset),
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
    };

    // Only fetch if we still think there's more
    if (hasMore || offset === 0) run();

    return () => {
      cancelled = true;
    };
  }, [trimmed, offset, pageSize]); // intentionally NOT depending on hasMore

  const loadMore = () => {
    // don’t spam requests
    if (isLoading || isLoadingMore || !hasMore) return;
    setOffset((prev) => prev + pageSize);
  };

  return { events, isLoading, isLoadingMore, hasMore, loadMore, error };
}
