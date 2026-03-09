import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

/**
 * Hook to fetch and filter events created by a given user.
 * @param {string} userId - Supabase user ID (not the whole user object)
 */
export default function useClientEvents(userId) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState([]);
  const [eventDateFilter, setEventDateFilter] = useState(null);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 10;

  useEffect(() => {
    if (userId) loadEvents();
  }, [userId, showPastEvents]);

  const loadEvents = async () => {
    if (!userId) return;

    setIsLoading(true);

    let query = supabase
      .from("events")
      .select("*, businesses(business_name), event_types(id, name, slug)")
      .eq("created_by", userId);

    if (!showPastEvents) {
      const today = new Date().toISOString().split("T")[0];
      query = query.gte("event_date", today);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading events:", error);
    } else {
      const normalized = (data ?? []).map((e) => ({
        ...e,
        business_name: e.businesses?.business_name ?? null,
        event_type: e.event_types?.name ?? null,
        event_type_slug: e.event_types?.slug ?? null,
        businesses: undefined,
        event_types: undefined,
      }));
      setEvents(normalized);
    }

    setIsLoading(false);
  };

  const filtered = events
    .filter((e) => e.event_name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (e) =>
        eventTypeFilter.length === 0 || eventTypeFilter.includes(e.event_type_slug)
    )
    .filter((e) => !eventDateFilter || e.event_date === eventDateFilter);

  const total = filtered.length;
  const totalPages = Math.ceil(total / EVENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  return {
    events: paginated,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    eventTypeFilter,
    setEventTypeFilter,
    eventDateFilter,
    setEventDateFilter,
    showPastEvents,
    setShowPastEvents,
    loadEvents,
    isLoading,
  };
}