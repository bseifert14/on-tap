import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import styles from "../../styles/HomeLayout.module.css";
import EventFiltersLayout from "../common/EventFiltersLayout";
import EventList from "../../components/events/EventList";
import SetPasswordModal from "../../components/SetPasswordModal";
import useGetListEvents from "../../utils/hooks/useGetListEvents";
import EventCardSkeleton from "../../components/events/EventCardSkeleton";
import Hero from "../common/Hero";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { PhotoRef } from "../../constants/photoRef";
import LoadMoreButton from "../../components/LoadMoreButton";
import { getTimeLabel } from "../../utils/formatDates";
import useTrackSearch from "../../utils/data-tracking/useTrackSearch";

export default function HomeLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackSearch } = useTrackSearch();

  const [selectedType, setSelectedType] = useState("events");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");

  const { events, isLoading, isLoadingMore, hasMore, loadMore, error } = useGetListEvents({
    search: searchTerm,
    selectedType,
    pageSize: 12,
  });

  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const accessToken = params.get("access_token");

    if (type === "recovery" && accessToken) {
      setShowSetPasswordModal(true);
    }
  }, [location]);

  useEffect(() => {
    const handlePasswordRecovery = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type = params.get("type");

      if (accessToken && refreshToken && type === "recovery") {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Error setting session from recovery link:", error.message);
          return;
        }

        window.history.replaceState({}, document.title, window.location.pathname);
        setShowSetPasswordModal(true);
      }
    };

    handlePasswordRecovery();
  }, []);

  const handleSearchSubmit = () => {
    const term = searchInput.trim();
    setSearchTerm(term);
    if (term.length >= 2) trackSearch(term);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const bgImageUrl = isMobile ? PhotoRef.MansfieldStars : PhotoRef.StowePanorama;
  const timeLabel = getTimeLabel();
  const label = timeLabel !== 'undefined' ? timeLabel : 'tonight';

  return (
    <div>
      <Hero bgImageUrl={bgImageUrl} label={label} />
      <div id="eventSection">
        <EventFiltersLayout
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onSearchClear={handleSearchClear}
        />

        <section className={styles.eventsSection}>
          <h2 className={styles.eventsHeader}>Upcoming</h2>

          {isLoading && (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          )}

          {!isLoading && (
            <>
              <EventList
                currentView="list"
                events={events}
                onSelectEvent={(event) =>
                  navigate(`/events/${event.id}`, {
                    state: { backgroundLocation: location, event },
                  })
                }
              />

              {hasMore && (
                <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
              )}
            </>
          )}
        </section>

        {showSetPasswordModal && (
          <SetPasswordModal onClose={() => setShowSetPasswordModal(false)} />
        )}
      </div>
    </div>
  );
}
