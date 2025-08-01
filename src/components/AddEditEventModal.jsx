import styles from "../styles/AddEditEventModal.module.css";
import { formatTime, generateTimeOptions } from "../utils/formatDates";
import useEventForm from "../utils/hooks/useEventForm";
import FormLabel from "./form/FormLabel";

const EVENT_TYPES = [
  "Music", "Sports", "Food & Bev", "Games", "Comedy",
  "Talks / Panels", "Wellness / Fitness", "Art"
];

export default function AddEditEventModal({ user, event, onClose, onSave }) {
  const {
    form,
    handleChange,
    handleSubmit,
    fileInputRef,
    selectedFile,
    validateAndProcessFile
  } = useEventForm(user, event, onSave);

  return (
    <div className={styles["eventModal-overlay"]}>
      <div className={styles["eventModal-box"]}>
        <h3 className={styles["eventModal-title"]}>
          {event ? "Edit Event" : "Add Event"}
        </h3>

        <FormLabel label="Event Name" name="event_name" isRequired />
        <input
          className={styles["eventModal-input"]}
          value={form.event_name}
          onChange={(e) => handleChange("event_name", e.target.value)}
        />

        <FormLabel label="Event Location" name="event_location" isRequired />
        <input
          className={styles["eventModal-input"]}
          value={form.event_location}
          onChange={(e) => handleChange("event_location", e.target.value)}
        />

        <FormLabel label="Event Type" name="event_type" isRequired />
        <select
          className={styles["eventModal-input"]}
          value={form.event_type}
          onChange={(e) => handleChange("event_type", e.target.value)}
        >
          <option value="">Select Event Type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <FormLabel label="Event Date" name="event_date" isRequired />
        <input
          className={styles["eventModal-input"]}
          type="date"
          value={form.event_date}
          onChange={(e) => handleChange("event_date", e.target.value)}
        />

        <div className={styles.timeFieldContainer}>
          <div className={styles.timeFieldItem}>
            <FormLabel label="Start Time" name="event_start_timestamp" isRequired />
            <select
              className={styles["eventModal-input"]}
              value={form.event_start_timestamp}
              onChange={(e) => handleChange("event_start_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("06:00", "23:30", 30).map((time) => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
          <div className={styles.timeFieldItem}>
            <FormLabel label="End Time" name="event_end_timestamp" />
            <select
              className={styles["eventModal-input"]}
              value={form.event_end_timestamp}
              onChange={(e) => handleChange("event_end_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("06:00", "23:30", 30).map((time) => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
        </div>

        <FormLabel label="Description" name="event_description" isRequired />
        <textarea
          className={styles["eventModal-textarea"]}
          value={form.event_description}
          onChange={(e) => handleChange("event_description", e.target.value)}
        />

        <FormLabel label="Audience" name="audience" />
        <label className={styles["eventModal-label"]}>Audience</label>
        <div className={styles["eventModal-radioGroup"]}>
          <label>
            <input
              type="radio"
              name="audience"
              checked={form.is_kid_friendly && !form.is_18_plus && !form.is_21_plus}
              onChange={() =>
                setAudience("kid")
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
                setAudience("18")
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
                setAudience("21")
              }
            />
            21+
          </label>
        </div>

        <FormLabel label="Event Link" name="event_url" />
        <input
          className={styles["eventModal-input"]}
          type="url"
          placeholder="https://example.com"
          value={form.event_url}
          onChange={(e) => handleChange("event_url", e.target.value)}
        />

        <FormLabel label="Event Photo" name="event_photo_url" />
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
          Max size 3MB. If left blank, a default image will be used based on event type.
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
