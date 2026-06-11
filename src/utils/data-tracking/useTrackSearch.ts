import { supabase } from "../../supabase";

export default function useTrackSearch() {
  const trackSearch = async (searchTerm: string, resultsCount: number | null = null) => {
    if (import.meta.env.MODE === "development") return;

    if (!searchTerm || searchTerm.trim().length < 2) return;

    try {
      await supabase.from("site_searches").insert({
        search_term: searchTerm.trim().toLowerCase(),
        results_count: resultsCount,
      });
    } catch (err) {
      return;
    }
  };

  return { trackSearch };
}