import { useEffect, useMemo } from "react";
import Modal from "../../components/common/Modal";
import EventModal from "../../components/events/EventModal";
import { EVENT_TYPES } from "../../constants/eventTypes";

export default function PostEventPreviewModal({ form, selectedFile, onClose }) {
  // Build a preview blob URL for the selected photo (if any), so the modal
  // can display it via event_photo_url without needing an upload first.
  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const typeMeta = EVENT_TYPES[form.event_type];

  // Shape the form data into what EventModal expects.
  const previewEvent = {
    id: "preview",
    event_name: form.event_name || "Untitled event",
    event_location: form.event_location || "",
    event_business_name: form.event_business_name || "",
    business_name: form.event_business_name || "",
    event_date: form.event_date || new Date().toISOString().split("T")[0],
    event_description: form.event_description || "",
    event_type_slug: form.event_type || "events",
    event_type: typeMeta?.label || "Event",
    event_start_timestamp:
      form.event_date && form.event_start_timestamp
        ? `${form.event_date}T${form.event_start_timestamp}:00`
        : null,
    event_end_timestamp:
      form.event_date && form.event_end_timestamp
        ? `${form.event_date}T${form.event_end_timestamp}:00`
        : null,
    event_url: form.event_url || null,
    event_photo_path: null,
    event_photo_url: previewUrl,
    business_url: null,
    event_min_age: form.event_min_age ?? 0,
  };

  return (
    <EventModal
      event={previewEvent}
      isLoading={false}
      error={null}
      onClose={onClose}
    />
  );
}
