import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import resizeImageIfNeeded from "../resizeImageIfNeeded";
import { sanitizeUrl } from "../sanitizeUrl";
import { formatStartTime } from "../formatDates";
import { uploadOrReuseEventPhoto } from "../uploadOrReuseEventPhoto";

function generateOccurrences(payload, form) {
  const occurrences = [];
  const current = new Date(form.event_date);
  const end = new Date(form.recurrence_end_date);
  const stepDays = { daily: 1, weekly: 7, biweekly: 14 };
  
  for (; current <= end;) {
    const dateStr = current.toISOString().split("T")[0];

    occurrences.push({
      ...payload,
      event_date: dateStr,
      event_start_timestamp: form.event_start_timestamp ? `${dateStr}T${form.event_start_timestamp}:00` : null,
      event_end_timestamp: form.event_end_timestamp ? `${dateStr}T${form.event_end_timestamp}:00` : null,
    });

    if (form.recurrence_frequency === "monthly") {
      current.setMonth(current.getMonth() + 1);
    } else {
      current.setDate(current.getDate() + stepDays[form.recurrence_frequency]);
    }
  }

  return occurrences;
}

export default function useEventForm(user, event, onSave, business) {
  const [form, setForm] = useState({
    event_name: "",
    event_location: "",
    event_business_name: "",
    event_type: "",
    event_date: "",
    event_start_timestamp: "",
    event_end_timestamp: "",
    event_description: "",
    event_url: "",
    event_photo_url: "",
    event_photo_path: "",
    is_recurring: false,
    recurrence_frequency: "weekly",
    recurrence_end_date: "",
    is_kid_friendly: true,
    is_18_plus: false,
    is_21_plus: false,
    event_min_age: 0
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const maxFileSizeMB = 3;

  useEffect(() => {
    if (event) {
      setForm({
        ...form,
        event_name: event.event_name || "",
        event_location: event.event_location || "",
        event_business_name: event.event_business_name || "",
        event_type: event.event_type_slug || event.event_type || "",
        event_date: event.event_date || "",
        event_start_timestamp: event.event_start_timestamp
          ? formatStartTime(event.event_start_timestamp)
          : "",
        event_end_timestamp: event.event_end_timestamp
          ? formatStartTime(event.event_end_timestamp)
          : "",
        event_description: event.event_description || "",
        event_url: event.event_url || "",
        event_photo_url: event.event_photo_url || "",
        event_photo_path: event.event_photo_path || "",
        event_min_age: event.event_min_age || 0,
        is_kid_friendly: event.is_kid_friendly ?? true,
        is_18_plus: event.is_18_plus ?? false,
        is_21_plus: event.is_21_plus ?? false,
        is_recurring: event.is_recurring ?? false,
        recurrence_frequency: event.recurrence_frequency || "weekly",
        recurrence_end_date: event.recurrence_end_date || ""
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateAndProcessFile = async (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.warning("Only JPG, PNG, or WebP images are allowed.");
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast.warning(`Image must be smaller than ${maxFileSizeMB}MB.`);
      return;
    }

    const resized = await resizeImageIfNeeded(file);
    setSelectedFile(resized);
  };

  const handleSubmit = async () => {
    if (form.is_recurring && !form.recurrence_end_date) {
      toast.error("Recurring events require an end date.");
      return;
    }

    if (form.is_recurring && form.recurrence_end_date < form.event_date) {
      toast.error("Recurrence end date must be on or after the event date.");
      return;
    }

    let photoPath = form.event_photo_path || null;

    if (selectedFile) {
      try {
        const { storagePath } = await uploadOrReuseEventPhoto(selectedFile);
        photoPath = storagePath;
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed.");
        return;
      }
    }

    // Resolve slug → UUID
    const { data: typeRow, error: typeError } = await supabase
      .from("event_types")
      .select("id")
      .eq("slug", form.event_type)
      .single();

    if (typeError || !typeRow) {
      toast.error("Invalid event type. Please select one from the list.");
      return;
    }

    const fullStart =
      form.event_date && form.event_start_timestamp
        ? `${form.event_date}T${form.event_start_timestamp}:00`
        : null;

    const fullEnd =
      form.event_date && form.event_end_timestamp
        ? `${form.event_date}T${form.event_end_timestamp}:00`
        : null;

    const cleanUrl = sanitizeUrl(form.event_url);

    const { event_type, event_photo_url, ...rest } = form; // strip old/derived fields

    const eventBusinessName = form.event_business_name || business?.business_name;
    const eventLocation = form.event_location || `${business?.street_address} ${business?.city}, ${business?.state} ${business?.zipcode}`;
    const recurrenceId = form.is_recurring ? crypto.randomUUID() : null;

    const payload = {
      ...rest,
      event_location: eventLocation,
      event_business_name: eventBusinessName,
      event_type_id: typeRow.id,
      event_url: cleanUrl || null,
      event_start_timestamp: fullStart,
      event_end_timestamp: fullEnd,
      created_by: user.id,
      event_photo_path: photoPath || null,
      recurrence_id: recurrenceId,
      recurrence_frequency: form.is_recurring ? form.recurrence_frequency : null,
      recurrence_end_date: form.is_recurring ? form.recurrence_end_date : null,
    };

    const rows = form.is_recurring ? generateOccurrences(payload, form) : [payload];

    const result = event
      ? await supabase.from("events").update(rows[0]).eq("id", event.id)
      : await supabase.from("events").insert(rows);

    if (result.error) {
      console.error(result.error);
      toast.error("Error saving event.");
    } else {
      onSave();
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    fileInputRef,
    selectedFile,
    validateAndProcessFile,
    maxFileSizeMB
  };
}
