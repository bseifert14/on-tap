import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../supabase";

export default function useClientEventsModal(onEventsUpdated) {
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleSaveEvent = () => {
    setShowModal(false);
    setEditingEvent(null);
    toast.success("Event saved successfully.");
    onEventsUpdated();
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    await supabase.from("events").delete().eq("id", eventToDelete.id);
    setEventToDelete(null);
    toast.success("Event deleted successfully.");
    onEventsUpdated();
  };

  return {
    editingEvent,
    setEditingEvent,
    showModal,
    setShowModal,
    eventToDelete,
    setEventToDelete,
    handleSaveEvent,
    handleDelete,
  };
}
