import { supabase } from "../../supabase";

export default function useTrackClick() {
  const trackClick = async (clickType, event = null) => {
    if (import.meta.env.MODE === "development") return;

    try {
      await supabase.from("event_clicks").insert({
        event_id: event?.id ?? null,
        event_name: event?.event_name ?? null,
        business_name: event?.event_business_name ?? event?.business_name ?? null,
        click_type: clickType,
      });
    } catch (err) {
      return;
    }
  };

  return { trackClick };
}