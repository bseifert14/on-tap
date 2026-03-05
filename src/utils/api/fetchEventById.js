import { fetchEvents } from "./fetchEvents";

export async function fetchEventById(id) {
  const data = await fetchEvents({ mode: "by_id", id: String(id) });
  return data ?? null;
}