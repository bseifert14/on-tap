import { useBusinessProfile } from "./useBusinessProfile";
import useClientEvents from "./useClientEvents";

/**
 * Combined hook to fetch both business profile and events for a given user.
 */
export default function useClientData(userId) {
  const {
    business,
    contact,
    businessId,
    isLoading: businessLoading,
  } = useBusinessProfile(userId);

  const {
    events,
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
    isLoading: eventsLoading
  } = useClientEvents(userId);

  return {
    business,
    contact,
    businessId,
    businessLoading,
    events,
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
    eventsLoading,
    isLoading: businessLoading || eventsLoading,
  };
}
