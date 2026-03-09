import { supabase } from "../supabase";
import { getDefaultImage } from "./getDefaultImage";

const BUCKET = "event-photos";

export function getEventImageUrl(event) {
  if (!event) return "";

  const { event_photo_path, event_photo_url, event_type_slug } = event;

  // 1) New way: path stored in DB
  if (event_photo_path) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(event_photo_path);
    return data?.publicUrl || getDefaultImage(event_type_slug);
  }

  // 2) Legacy way: full URL stored in DB
  if (event_photo_url) return event_photo_url;

  // 3) Default fallback
  return getDefaultImage(event_type_slug);
}
