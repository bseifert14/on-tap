import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const EVENT_TYPES = ["Music", "Sports", "Kid Friendly", "Food & Bev"];

export default function AddEditEventModal({ user, event, onClose, onSave }) {
  const [form, setForm] = useState({
    event_type: "",
    event_name: "",
    event_location: "",
    event_date: "",
    event_description: "",
    event_photo_url: ""
  });

  useEffect(() => {
    if (event) {
      setForm({
        event_type: event.event_type || "",
        event_name: event.event_name || "",
        event_location: event.event_location || "",
        event_date: event.event_date || "",
        event_description: event.event_description || "",
        event_photo_url: event.event_photo_url || ""
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      created_by: user.uid
    };

    let result;
    if (event) {
      result = await supabase
        .from("events")
        .update(payload)
        .eq("id", event.id);
    } else {
      result = await supabase.from("events").insert(payload);
    }

    if (result.error) {
      alert("Error saving event");
    } else {
      onSave();
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3>{event ? "Edit Event" : "Add Event"}</h3>

        <select
          value={form.event_type}
          onChange={e => handleChange("event_type", e.target.value)}
        >
          <option value="">Select Event Type</option>
          {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>

        <input
          placeholder="Event Name"
          value={form.event_name}
          onChange={e => handleChange("event_name", e.target.value)}
        />

        <input
          placeholder="Location"
          value={form.event_location}
          onChange={e => handleChange("event_location", e.target.value)}
        />

        <input
          type="date"
          value={form.event_date}
          onChange={e => handleChange("event_date", e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={form.event_description}
          onChange={e => handleChange("event_description", e.target.value)}
        />

        <input
          placeholder="Photo URL (optional)"
          value={form.event_photo_url}
          onChange={e => handleChange("event_photo_url", e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalBox = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minWidth: 300
};
