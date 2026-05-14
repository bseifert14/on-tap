import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/fetchEvents";
import { getTypeInParam } from "../../constants/eventTypes";
import useTrackSearch from "../data-tracking/useTrackSearch";

export default function useGetListEvents({ search = "", selectedType = "All", pageSize = 12 } = {}) {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { trackSearch } = useTrackSearch();

  const trimmed = useMemo(() => search.trim(), [search]);

  const typeList = useMemo(() => getTypeInParam(selectedType), [selectedType]);
  const typeIn = useMemo(() => (typeList ? typeList.join(",") : ""), [typeList]);

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
            ? { mode: "search", q: trimmed, from }
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

        if (trimmed.length >= 2) {
          trackSearch(trimmed, data.length);
          // // Disable for now, too much noise to start
          // data.forEach((event) => trackClick("search_result", event));
        }

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