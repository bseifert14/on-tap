import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EventModal from "../../components/events/EventModal";
import { fetchEventById } from "../../utils/api/fetchEventById";

export default function EventRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();

  const hasBackground = Boolean(location.state?.backgroundLocation);
  const initialEvent = location.state?.event ?? null;

  const [event, setEvent] = useState(initialEvent);
  const [isLoading, setIsLoading] = useState(!initialEvent);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (initialEvent) return; // instant open, no fetch

      const controller = new AbortController();
      const { signal } = controller;

      async function fetchData() {
        setIsLoading(true);
        try {
          const data = await fetchEventById(eventId, { signal });
          if (!signal.aborted) {
            if (!data) {
              setError("Event not found");
            } else {
              setEvent(data);
              setError(null);
            }
          }
        } catch (e) {
          if (!signal.aborted) {
            setError("Failed to load event");
          }
        } finally {
          if (!signal.aborted) {
            setIsLoading(false);
          }
        }
      }

      fetchData();

      return () => {
        controller.abort();
      };
  }, [eventId, initialEvent]);

  const handleClose = () => {
        hasBackground ? navigate(-1) : navigate("/");
  };

  return <EventModal event={event} onClose={handleClose} isLoading={isLoading} error={error} />;
}
