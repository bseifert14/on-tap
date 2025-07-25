import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import styles from "../../styles/HomeLayout.module.css";
import EventFiltersLayout from "../common/EventFiltersLayout"
import EventList from "../../components/events/EventList";;
import EventModal from "../../components/events/EventModal";
import HeroLayout from "../common/HeroLayout";
import SetPasswordModal from "../../components/SetPasswordModal";
import EmptyEventsView from "../../components/events/EmptyEventsView";

export default function HomeLayout() {
  const location = useLocation();
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

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
      const params = new URLSearchParams(hash.substring(1)); // remove the #
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
  
        // Clean up the hash from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
  
        // Show password modal
        setShowSetPasswordModal(true);
      }
    };
  
    handlePasswordRecovery();
  }, []);
  

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString().split("T")[0])
        .order("event_date", { ascending: true });
    
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        // Flatten `businesses.name` into `business_name`
        const normalized = data.map(event => ({
          ...event,
          business_name: event.businesses?.name || null
        }));
        setEvents(normalized);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <div>
      <HeroLayout currentView="list" />
      <div className={styles.homeBody} id="eventSection">
          <EventFiltersLayout selectedType={selectedType} onTypeChange={setSelectedType} />
          { events.length === 0 && (
            <EmptyEventsView currentView="list" />
          )}
          <EventList
            events={events}
            selectedType={selectedType}
            onSelectEvent={(event) => setSelectedEvent(event)}
          />

          {selectedEvent && (
              <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          )}

          {showSetPasswordModal && (
              <SetPasswordModal
              onClose={() => setShowSetPasswordModal(false)}
              />
          )}
      </div>
    </div>
  );
}
