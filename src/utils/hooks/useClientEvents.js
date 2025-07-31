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
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 10;

  useEffect(() => {
    if (userId) loadEvents();
  }, [userId]);

  const loadEvents = async () => {
    if (!userId) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", userId);

    if (error) {
      console.error("Error loading events:", error);
    } else {
      setEvents(data);
    }

    setIsLoading(false);
  };

  const filtered = events
    .filter(e => e.event_name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => eventTypeFilter.length === 0 || eventTypeFilter.includes(e.event_type))
    .filter(e => !eventDateFilter || e.event_date === eventDateFilter);

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
    loadEvents,
    isLoading,
  };
}
