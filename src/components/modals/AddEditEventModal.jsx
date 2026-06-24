import styles from "../../styles/AddEditEventModal.module.css";
import { formatTime, generateTimeOptions } from "../../utils/formatDates";
import useEventForm from "../../utils/hooks/useEventForm";
import Modal from "../common/Modal";
import FormLabel from "../form/FormLabel";
import EventTypeOptionList from "../inputs/EventTypeOptionList";

export default function AddEditEventModal({ user, business, event, onClose, onSave }) {
  const {
    form,
    handleChange,
    handleSubmit,
    fileInputRef,
    selectedFile,
    validateAndProcessFile
  } = useEventForm(user, event, onSave, business);

  const Footer = () => {
    return (
      <div className={styles.eventModalActions}>
        <button className={styles.eventModalButtonPrimary} onClick={handleSubmit}>
          Save
        </button>
        <button className={styles.eventModalButtonSecondary} onClick={onClose}>
          Cancel
        </button>
      </div>
    );
  }

  const defaultAddress = `${business.street_address} ${business.city}, ${business.state} ${business.zipcode}`;

  return (
    <Modal
      onClose={onClose}
      footer={<Footer />}
    >
      <h3 className={styles.eventModalTitle}>
        {event ? "Edit Event" : "Add Event"}
      </h3>
      <div>
        <FormLabel label="Event Name" name="event_name" isRequired />
        <input
          className={styles.eventModalInput}
          value={form.event_name}
          onChange={(e) => handleChange("event_name", e.target.value)}
        />

        <FormLabel label="Event Type" name="event_type" isRequired />
        <select
          className={styles.eventModalInput}
          value={form.event_type}
          onChange={(e) => handleChange("event_type", e.target.value)}
        >
          <EventTypeOptionList />
        </select>

        <FormLabel label="Event Address" name="event_location" isRequired />
        <input
          className={styles.eventModalInput}
          value={form.event_location}
          placeholder={defaultAddress}
          onChange={(e) => handleChange("event_location", e.target.value)}
        />

        <FormLabel label="Event Business Name" name="event_business_name" isRequired />
        <input
          className={styles.eventModalInput}
          value={form.event_business_name}
          placeholder={business.business_name}
          onChange={(e) => handleChange("event_business_name", e.target.value)}
        />

        <FormLabel label="Event Date" name="event_date" isRequired />
        <input
          className={styles.eventModalInput}
          type="date"
          value={form.event_date}
          onChange={(e) => handleChange("event_date", e.target.value)}
        />

        <div className={styles.timeFieldContainer}>
          <div className={styles.timeFieldItem}>
            <FormLabel label="Start Time" name="event_start_timestamp" isRequired />
            <select
              className={styles.eventModalInput}
              value={form.event_start_timestamp}
              onChange={(e) => handleChange("event_start_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("06:00", "23:30", 15).map((time) => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
          <div className={styles.timeFieldItem}>
            <FormLabel label="End Time" name="event_end_timestamp" />
            <select
              className={styles.eventModalInput}
              value={form.event_end_timestamp}
              onChange={(e) => handleChange("event_end_timestamp", e.target.value)}
            >
              <option value="">Select time</option>
              {generateTimeOptions("00:00", "23:30", 15).map((time) => (
                <option key={time} value={time}>{formatTime(time)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.recurringSection}>
          <div className={styles.recurringHeader}>
            <div>
              <div className={styles.recurringLabel}>Recurring event</div>
              <div className={styles.recurringSubtitle}>Repeats on a set schedule</div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={form.is_recurring}
                onChange={(e) => handleChange("is_recurring", e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          {form.is_recurring && (
            <>
              <hr className={styles.recurringDivider} />
              <div className={styles.recurringFields}>
                <div className={styles.recurringFieldGroup}>
                  <div className={styles.recurringFieldLabel}>Repeats</div>
                  <select
                    className={styles.eventModalInput}
                    value={form.recurrence_frequency}
                    onChange={(e) => handleChange("recurrence_frequency", e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className={styles.recurringFieldGroup}>
                  <div className={styles.recurringFieldLabel}>End Date</div>
                  <input
                    type="date"
                    className={styles.eventModalInput}
                    value={form.recurrence_end_date}
                    onChange={(e) => handleChange("recurrence_end_date", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <FormLabel label="Description" name="event_description" isRequired />
        <textarea
          className={styles.eventModalTextArea}
          value={form.event_description}
          onChange={(e) => handleChange("event_description", e.target.value)}
        />

        <FormLabel label="Audience" name="audience" />
        <div className={styles.eventModalRadioGroup}>
          <label>
            <input
              type="radio"
              name="audience"
              checked={form.event_min_age === 0}
              onChange={() => handleChange("event_min_age", 0)}
            />
            All Ages
          </label>
          <label>
            <input
              type="radio"
              name="audience"
              checked={form.event_min_age === 18}
              onChange={(e) => handleChange("event_min_age", 18)}
            />
            18+
          </label>
          <label>
            <input
              type="radio"
              name="audience"
              checked={form.event_min_age === 21}
              onChange={() => handleChange("event_min_age", 21)}
            />
            21+
          </label>
        </div>

        <FormLabel label="Event Link" name="event_url" />
        <input
          className={styles.eventModalInput}
          type="url"
          placeholder="https://example.com"
          value={form.event_url}
          onChange={(e) => handleChange("event_url", e.target.value)}
        />

        <FormLabel label="Event Photo" name="event_photo_path" />
        <div
          className={styles.eventModalDropzone}
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
        <small className={styles.eventModalNote}>
          Max size 3MB. If left blank, a default image will be used based on event type.
        </small>
      </div>
    </Modal>
  )
}
