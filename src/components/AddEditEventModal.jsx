import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase";
import styles from "../styles/AddEditEventModal.module.css";
import { formatTime, generateTimeOptions } from "../utils/formatDates";

const EVENT_TYPES = [
  "Music", "Sports", "Food & Bev", "Games", "Comedy",
  "Talks / Panels", "Wellness / Fitness", "Art"
];

const AUDIENCE_TYPES = ["", "Kid Friendly", "18+", "21+"];

export default function AddEditEventModal({ user, event, onClose, onSave }) {
  const [form, setForm] = useState({
    event_name: "",
    event_location: "",
    event_type: "",
    event_date: "",
    event_start_timestamp: "",
    event_end_timestamp: "",
    event_description: "",
    event_url: "",
    event_photo_url: "",
    is_kid_friendly: true,
    is_18_plus: false,
    is_21_plus: false
  });
  console.log(user);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const maxFileSizeMB = 3;

  useEffect(() => {
    if (event) {
      setForm({
        event_name: event.event_name || "",
        event_location: event.event_location || "",
        event_type: event.event_type || "",
        event_date: event.event_date || "",
        event_start_timestamp: event.event_start_timestamp
          ? new Date(event.event_start_timestamp).toISOString().slice(11, 16)  // "HH:MM"
          : "",
          event_end_timestamp: event.event_end_timestamp
          ? new Date(event.event_end_timestamp).toISOString().slice(11, 16)  // "HH:MM"
          : "",
        event_description: event.event_description || "",
        event_url: event.event_url || "",
        event_photo_url: event.event_photo_url || "",
        is_kid_friendly: event.is_kid_friendly ?? true,
        is_18_plus: event.is_18_plus ?? false,
        is_21_plus: event.is_21_plus ?? false
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateAndProcessFile = async (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WebP images are allowed.");
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`Image must be smaller than ${maxFileSizeMB}MB.`);
      return;
    }

    const resized = await resizeImageIfNeeded(file);
    setSelectedFile(resized);
  };

  const resizeImageIfNeeded = (file, maxWidth = 1280) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          if (img.width <= maxWidth) return resolve(file);

          const canvas = document.createElement("canvas");
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, file.type);
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    let photoUrl = form.event_photo_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(fileName, selectedFile);

      if (uploadError) {
        alert("Image upload failed.");
        console.error(uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-photos")
        .getPublicUrl(fileName);

      photoUrl = publicUrlData.publicUrl;
    }

    const fullStartTimestamp =
      form.event_start_timestamp?.includes("T")
        ? form.event_start_timestamp
        : form.event_date && form.event_start_timestamp
        ? `${form.event_date}T${form.event_start_timestamp}:00`
        : null;

    const fullEndTimestamp =
      form.event_end_timestamp?.includes("T")
        ? form.event_end_timestamp
        : form.event_date && form.event_end_timestamp
        ? `${form.event_date}T${form.event_end_timestamp}:00`
        : null;

    const payload = {
      ...form,
      event_start_timestamp: fullStartTimestamp,
      event_end_timestamp: fullEndTimestamp,
      created_by: user.id,
      event_photo_url: photoUrl || null
    };

    const result = event
      ? await supabase.from("events").update(payload).eq("id", event.id)
      : await supabase.from("events").insert(payload);

    if (result.error) {
      alert("Error saving event");
      console.error(result.error);
    } else {
      onSave();
    }
  };

  return (
    <div className={styles["eventModal-overlay"]}>
      <div className={styles["eventModal-box"]}>
        <h3 className={styles["eventModal-title"]}>
          {event ? "Edit Event" : "Add Event"}
        </h3>

        <label className={styles["eventModal-label"]}>Event Name*</label>
        <input
          className={styles["eventModal-input"]}
          value={form.event_name}
          onChange={e => handleChange("event_name", e.target.value)}
        />

        <label className={styles["eventModal-label"]}>Event Location*</label>
        <input
          className={styles["eventModal-input"]}
          value={form.event_location}
          onChange={e => handleChange("event_location", e.target.value)}
        />

        <label className={styles["eventModal-label"]}>Event Type*</label>
        <select
          className={styles["eventModal-input"]}
          value={form.event_type}
          onChange={e => handleChange("event_type", e.target.value)}
        >
          <option value="">Select Event Type</option>
          {EVENT_TYPES.map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <label className={styles["eventModal-label"]}>Event Date*</label>
        <input
          className={styles["eventModal-input"]}
          type="date"
          value={form.event_date}
          onChange={e => handleChange("event_date", e.target.value)}
        />

        <div className={styles.timeFieldContainer}>
          <div className={styles.timeFieldItem}>
            <label className={styles["eventModal-label"]}>Event Start Time*</label>
            <select
              className={styles["eventModal-input"]}
              value={form.event_start_timestamp}
              onChange={e => handleChange("event_start_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("06:00", "23:30", 30).map(time => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
          <div className={styles.timeFieldItem}>
            <label className={styles["eventModal-label"]}>Event End Time</label>
            <select
              className={styles["eventModal-input"]}
              value={form.event_end_timestamp}
              onChange={e => handleChange("event_end_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("06:00", "23:30", 30).map(time => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
        </div>

        <label className={styles["eventModal-label"]}>Description*</label>
        <textarea
          className={styles["eventModal-textarea"]}
          value={form.event_description}
          onChange={e => handleChange("event_description", e.target.value)}
        />

        <label className={styles["eventModal-label"]}>Audience</label>
        <div className={styles["eventModal-radioGroup"]}>
          <label>
            <input
              type="radio"
              name="audience"
              checked={form.is_kid_friendly && !form.is_18_plus && !form.is_21_plus}
              onChange={() =>
                setForm({
                  ...form,
                  is_kid_friendly: true,
                  is_18_plus: false,
                  is_21_plus: false
                })
              }
            />
            All Ages
          </label>
          <label>
            <input
              type="radio"
              name="audience"
              checked={!form.is_kid_friendly && form.is_18_plus && !form.is_21_plus}
              onChange={() =>
                setForm({
                  ...form,
                  is_kid_friendly: false,
                  is_18_plus: true,
                  is_21_plus: false
                })
              }
            />
            18+
          </label>
          <label>
            <input
              type="radio"
              name="audience"
              checked={!form.is_kid_friendly && !form.is_18_plus && form.is_21_plus}
              onChange={() =>
                setForm({
                  ...form,
                  is_kid_friendly: false,
                  is_18_plus: false,
                  is_21_plus: true
                })
              }
            />
            21+
          </label>
        </div>

        <label className={styles["eventModal-label"]}>Event Link (optional)</label>
        <input
          className={styles["eventModal-input"]}
          type="url"
          placeholder="https://example.com"
          value={form.event_url}
          onChange={e => handleChange("event_url", e.target.value)}
        />

        <label className={styles["eventModal-label"]}>Event Photo (optional)</label>
        <div
          className={styles["eventModal-dropzone"]}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) validateAndProcessFile(file);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedFile ? selectedFile.name : "Click or drag a photo to upload"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) validateAndProcessFile(file);
            }}
          />
        </div>
        <small className={styles["eventModal-note"]}>
          Max size {maxFileSizeMB}MB. If left blank, a default image will be used based on event type.
        </small>

        <div className={styles["eventModal-actions"]}>
          <button className={styles["eventModal-buttonPrimary"]} onClick={handleSubmit}>
            Save
          </button>
          <button className={styles["eventModal-buttonSecondary"]} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
