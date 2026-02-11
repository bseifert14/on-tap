import { supabase } from "../supabase";
import { sha256File } from "./hashFile";

/**
 * Uploads the file only if it doesn't already exist.
 * Returns { storagePath, publicUrl }.
 */
export async function uploadOrReuseEventPhoto(file) {
  const bucket = "event-photos";

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const hash = await sha256File(file);

  const storagePath = `photos/${hash}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, {
      upsert: false,
      contentType: file.type,
      cacheControl: "3600",
    });

  // If it already exists, that's fine — we’re deduping.
  if (uploadError && !String(uploadError.message || "").toLowerCase().includes("already exists")) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(storagePath);

  return { storagePath, publicUrl: publicUrlData.publicUrl };
}

