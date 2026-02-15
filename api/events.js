import { supabaseServer } from "./_supabaseServer.js";

function escapeLike(str) {
  // prevent % and _ from turning into wildcard “match everything”
  return str.replace(/[\\%_]/g, (m) => `\\${m}`);
}

export default async function handler(req, res) {
  try {
    const supabase = supabaseServer();

    const mode = (req.query.mode ?? "list").toString();

    const limit = Math.min(parseInt(req.query.limit ?? "50", 10), 200);

    // offset comes from your "Load More" hook
    const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);
    const rangeFrom = offset;
    const rangeTo = offset + limit - 1;

    const select = `
      id,
      event_type,
      event_name,
      event_location,
      event_date,
      event_start_timestamp,
      event_end_timestamp,
      event_description,
      event_min_age,
      event_photo_url,
      event_photo_path,
      event_url,
      event_business_name,
      businesses ( business_name )
    `;

    let query = supabase.from("events").select(select);

    if (mode === "list") {
      const today = new Date().toISOString().split("T")[0];
      const fromDate = (req.query.from ?? today).toString();

      query = query
        .gte("event_date", fromDate)
        // stable ordering for pagination:
        .order("event_date", { ascending: true })
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);
    } else if (mode === "search") {
      const qRaw = (req.query.q ?? "").toString().trim();

      if (qRaw.length < 2) {
        return res.status(200).json({ data: [] });
      }

      const q = escapeLike(qRaw);
      const pattern = `%${q}%`;

      query = query
        .or(
          `event_name.ilike.${pattern},event_location.ilike.${pattern},event_description.ilike.${pattern}`
        )
        .order("event_date", { ascending: true })
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);
    } else if (mode === "calendar") {
      const start = (req.query.start ?? "").toString();
      const end = (req.query.end ?? "").toString();
      const qRaw = (req.query.q ?? "").toString().trim();

      if (!start || !end) {
        return res.status(400).json({ error: "start and end are required for calendar mode" });
      }

      query = query
        .gte("event_date", start)
        .lte("event_date", end);

      if (qRaw.length >= 2) {
        const q = escapeLike(qRaw);
        const pattern = `%${q}%`;
        query = query.or(
          `event_name.ilike.${pattern},event_location.ilike.${pattern},event_description.ilike.${pattern}`
        );
      } else if (qRaw.length > 0) {
        return res.status(200).json({ data: [] });
      }

      query = query
        .order("event_date", { ascending: true })
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);
    } else {
      return res.status(400).json({ error: `Unknown mode: ${mode}` });
    }

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });

    const normalized = (data ?? []).map((event) => ({
      ...event,
      business_name: event.businesses?.business_name ?? null,
      businesses: undefined,
    }));

    return res.status(200).json({ data: normalized });
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? "Unknown server error" });
  }
}
