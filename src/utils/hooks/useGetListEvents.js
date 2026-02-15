import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";
import { FILTER_TO_TYPES } from "../../constants/eventTypes";

export default function useGetListEvents({ search = "", selectedType = "All", pageSize = 12 } = {}) {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const trimmed = useMemo(() => search.trim(), [search]);

  // Convert selectedType (UI id) => array of DB types
  const typeList = useMemo(() => FILTER_TO_TYPES[selectedType] ?? null, [selectedType]);
  const typeIn = useMemo(() => (typeList ? typeList.join(",") : ""), [typeList]);

  // Reset when search OR selectedType changes
  useEffect(() => {
    setEvents([]);
    setOffset(0);
    setHasMore(true);
  }, [trimmed, typeIn]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setError(null);

        if (offset === 0) setIsLoading(true);
        else setIsLoadingMore(true);

        const from = new Date().toISOString().split("T")[0];

        const baseParams =
          trimmed.length >= 2
            ? { mode: "search", q: trimmed, from } // include from
            : { mode: "list", from };

        const params = {
          ...baseParams,
          limit: String(pageSize),
          offset: String(offset),
          ...(typeIn ? { type_in: typeIn } : {}),
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

    if (hasMore || offset === 0) run();

    return () => {
      cancelled = true;
    };
  }, [trimmed, typeIn, offset, pageSize]);

  const loadMore = () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    setOffset((prev) => prev + pageSize);
  };

  return { events, isLoading, isLoadingMore, hasMore, loadMore, error };
}
