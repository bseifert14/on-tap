import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import styles from "../../styles/HomeLayout.module.css";
import EventFiltersLayout from "../common/EventFiltersLayout";
import EventList from "../../components/events/EventList";
import EventModal from "../../components/events/EventModal";
import SetPasswordModal from "../../components/SetPasswordModal";
import useGetListEvents from "../../utils/hooks/useGetListEvents";
import EventCardSkeleton from "../../components/events/EventCardSkeleton";
import Hero from "../common/Hero";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export default function HomeLayout() {
  const location = useLocation();
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");

  const { events, isLoading, error } = useGetListEvents({
    search: searchTerm,
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
    setSearchTerm(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const bgImageUrl = isMobile ? '../../public/images/hero/mansfield-stars.jpg' : '../../public/images/hero/jeffrey-clayton-stowe.jpg';

  return (
    <div>
      <Hero
        title="What's going on tonight in Stowe?"
        subtitleTop="From mountain adventures to live bands - never miss a beat around town."
        ctaLabel="Explore Events"
        bgImageUrl={bgImageUrl}
      />
      <div className={styles.homeBody} id="eventSection">
        <EventFiltersLayout
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onSearchClear={handleSearchClear}
        />

        <p className={styles.eventListHeader}>Upcoming Events</p>

        {isLoading && <EventCardSkeleton />}

        {!isLoading && (
          <EventList
            events={events}
            selectedType={selectedType}
            onSelectEvent={(event) => setSelectedEvent(event)}
          />
        )}

        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}

        {showSetPasswordModal && (
          <SetPasswordModal onClose={() => setShowSetPasswordModal(false)} />
        )}
      </div>
    </div>
  );
}
