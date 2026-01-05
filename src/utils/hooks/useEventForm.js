// hooks/useEventForm.js
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import resizeImageIfNeeded from "../resizeImageIfNeeded";
import { sanitizeUrl } from "../sanitizeUrl";

export default function useEventForm(user, event, onSave) {
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
        event_type: event.event_type || "",
        event_date: event.event_date || "",
        event_start_timestamp: event.event_start_timestamp
          ? new Date(event.event_start_timestamp).toISOString().slice(11, 16)
          : "",
        event_end_timestamp: event.event_end_timestamp
          ? new Date(event.event_end_timestamp).toISOString().slice(11, 16)
          : "",
        event_description: event.event_description || "",
        event_url: event.event_url || "",
        event_photo_url: event.event_photo_url || "",
        event_min_age: event.event_min_age || 0,
        is_kid_friendly: event.is_kid_friendly ?? true,
        is_18_plus: event.is_18_plus ?? false,
        is_21_plus: event.is_21_plus ?? false,
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
    let photoUrl = form.event_photo_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(fileName, selectedFile);

      if (uploadError) {
        toast.error("Image upload failed.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-photos")
        .getPublicUrl(fileName);

      photoUrl = publicUrlData.publicUrl;
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

    const payload = {
      ...form,
      event_url: cleanUrl || null,
      event_start_timestamp: fullStart,
      event_end_timestamp: fullEnd,
      created_by: user.id,
      event_photo_url: photoUrl || null
    };

    const result = event
      ? await supabase.from("events").update(payload).eq("id", event.id)
      : await supabase.from("events").insert(payload);

    if (result.error) {
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
