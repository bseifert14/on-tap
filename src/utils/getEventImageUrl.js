import { supabase } from "../supabase";
import { getDefaultImage } from "./getDefaultImage";

const BUCKET = "event-photos";

export function getEventImageUrl(event) {
  if (!event) return "";

  const { event_photo_path, event_photo_url, event_type_slug } = event;

  if (event_photo_path) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(event_photo_path, {
      transform: {
        width: 800,
        quality: 75,
      },
    });
    return data?.publicUrl || getDefaultImage(event_type_slug);
  }

  if (event_photo_url) return event_photo_url;

  return getDefaultImage(event_type_slug);
}
