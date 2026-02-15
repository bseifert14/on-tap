import { supabaseServer } from "./_supabaseServer.js";

function escapeLike(str) {
  return str.replace(/[\\%_]/g, (m) => `\\${m}`);
}

export default async function handler(req, res) {
  try {
    const supabase = supabaseServer();

    const mode = (req.query.mode ?? "list").toString();

    const limit = Math.min(parseInt(req.query.limit ?? "50", 10), 200);
    const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);
    const rangeFrom = offset;
    const rangeTo = offset + limit - 1;

    const type = (req.query.type ?? "All").toString();
    const qRaw = (req.query.q ?? "").toString().trim();

    const typeInRaw = (req.query.type_in ?? "").toString().trim();
    const typeInList = typeInRaw ? typeInRaw.split(",").map((s) => s.trim()).filter(Boolean) : null;


    // helper filters
    const applyType = (query) => {
      if (typeInList && typeInList.length > 0) return query.in("event_type", typeInList);
      if (type !== "All") return query.eq("event_type", type);
      return query;
    };

    const applySearch = (query) => {
      if (qRaw.length >= 2) {
        const q = escapeLike(qRaw);
        const pattern = `%${q}%`;
        return query.or(
          `event_name.ilike.${pattern},event_location.ilike.${pattern},event_description.ilike.${pattern}`
        );
      }
      if (qRaw.length > 0) return null; // 1 char => empty result (same rule as your search)
      return query;
    };

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

    // --------------------------
    // CALENDAR DOTS (MONTH VIEW)
    // --------------------------
    if (mode === "calendar_dots") {
      const start = (req.query.start ?? "").toString();
      const end = (req.query.end ?? "").toString();

      if (!start || !end) {
        return res.status(400).json({ error: "start and end are required for calendar_dots" });
      }

      let query = supabase
        .from("events")
        .select("event_date")
        .gte("event_date", start)
        .lte("event_date", end);

      query = applyType(query);

      const searched = applySearch(query);
      if (searched === null) return res.status(200).json({ dates: [] });
      query = searched;

      const { data, error } = await query.order("event_date", { ascending: true });
      if (error) return res.status(500).json({ error: error.message });

      const dates = Array.from(new Set((data ?? []).map((r) => r.event_date)));
      return res.status(200).json({ dates });
    }

    // --------------------------
    // DAY EVENTS (RIGHT PANEL)
    // --------------------------
    if (mode === "day") {
      const date = (req.query.date ?? "").toString();
      if (!date) return res.status(400).json({ error: "date is required for day mode" });

      let query = supabase.from("events").select(select).eq("event_date", date);

      query = applyType(query);

      const searched = applySearch(query);
      if (searched === null) return res.status(200).json({ data: [] });
      query = searched;

      query = query
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);

      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });

      const normalized = (data ?? []).map((event) => ({
        ...event,
        business_name: event.businesses?.business_name ?? null,
        businesses: undefined,
      }));

      return res.status(200).json({ data: normalized });
    }

    // --------------------------
    // KEEP YOUR EXISTING MODES
    // --------------------------
    let query = supabase.from("events").select(select);

    if (mode === "list") {
      const today = new Date().toISOString().split("T")[0];
      const fromDate = (req.query.from ?? today).toString();

      query = query
        .gte("event_date", fromDate);

      // APPLY FILTERS
      query = applyType(query);
      const searched = applySearch(query);
      if (searched === null) return res.status(200).json({ data: [] });
      query = searched;

      query = query
        .order("event_date", { ascending: true })
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);

    } else if (mode === "search") {
      // Don't create a separate q variable and bypass applySearch
      // Use the existing qRaw + applySearch pipeline

      // Optional: keep results "upcoming" even in search mode
      const today = new Date().toISOString().split("T")[0];
      const fromDate = (req.query.from ?? today).toString();

      query = query.gte("event_date", fromDate);

      // APPLY FILTERS
      query = applyType(query);
      const searched = applySearch(query);
      if (searched === null) return res.status(200).json({ data: [] });
      query = searched;

      query = query
        .order("event_date", { ascending: true })
        .order("event_start_timestamp", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(rangeFrom, rangeTo);

    } else if (mode === "calendar") {
      const start = (req.query.start ?? "").toString();
      const end = (req.query.end ?? "").toString();
      if (!start || !end) {
        return res.status(400).json({ error: "start and end are required for calendar mode" });
      }

      query = query
        .gte("event_date", start)
        .lte("event_date", end);

      // APPLY FILTERS
      query = applyType(query);
      const searched = applySearch(query);
      if (searched === null) return res.status(200).json({ data: [] });
      query = searched;

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
