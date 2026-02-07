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
        event_url,
        event_business_name,
        businesses ( business_name )
        `;


    // Base query
    let query = supabase.from("events").select(select);

    if (mode === "list") {
      const today = new Date().toISOString().split("T")[0];
      const from = (req.query.from ?? today).toString();

      query = query
        .gte("event_date", from)
        .order("event_date", { ascending: true })
        .limit(limit);
    }

    if (mode === "calendar") {
      const start = (req.query.start ?? "").toString();
      const end = (req.query.end ?? "").toString();

      if (!start || !end) {
        return res.status(400).json({ error: "start and end are required for calendar mode" });
      }

      query = query
        .gte("event_date", start)
        .lte("event_date", end)
        .order("event_date", { ascending: true })
        .limit(limit);
    }

    if (mode === "search") {
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
        .limit(limit);
    }

    function escapeLike(str) {
  return str.replace(/[\\%_]/g, (m) => `\\${m}`);
}

    if (mode === "calendar") {
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

    query = query.order("event_date", { ascending: true }).limit(limit);
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
