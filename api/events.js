import { supabaseServer } from "./_supabaseServer.js";

const ALLOWED_MODES = new Set(["list", "search", "calendar", "calendar_dots", "day", "by_id"]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseMode(value) {
  const mode = (value ?? "list").toString().trim();

  if (!ALLOWED_MODES.has(mode)) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  return mode;
}

function parseIntParam(value, fallback, { min = -Infinity, max = Infinity } = {}) {
  const parsed = Number.parseInt((value ?? "").toString(), 10);
  const safe = Number.isNaN(parsed) ? fallback : parsed;
  return Math.min(Math.max(safe, min), max);
}

function parseDateParam(value, fieldName) {
  const date = (value ?? "").toString().trim();
  
  if (!date) {
    return "";
  }

  if (!DATE_RE.test(date)) {
    throw new Error(`${fieldName} must be YYYY-MM-DD`);
  }

  return date;
}

function escapeLike(str) {
  return str.replace(/[\\%_]/g, (m) => `\\${m}`);
}

const SELECT_FIELDS = `
  id,
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
  businesses ( business_name ),
  event_types ( id, name, slug )
`;

const normalizeEvent = (event) => ({
  ...event,
  business_name: event.businesses?.business_name ?? null,
  event_type: event.event_types?.name ?? null,
  event_type_slug: event.event_types?.slug ?? null,
  businesses: undefined,
  event_types: undefined,
});

async function handleCalendarDots({ supabase, req, res, applyType, applySearch }) {
    const start = parseDateParam(req.query.start, "start");
    const end = parseDateParam(req.query.end, "end");

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

    if (searched === null) {
        return res.status(200).json({ dates: [] });
    }

    query = searched;

    const { data, error } = await query.order("event_date", { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const dates = Array.from(new Set((data ?? []).map((row) => row.event_date)));
    return res.status(200).json({ dates });
}

async function handleDay({ supabase, req, res, applyType, applySearch, rangeFrom, rangeTo }) {
  const date = parseDateParam(req.query.date, "date");
  if (!date) {
    return res.status(400).json({ error: "date is required for day mode" });
  }

  let query = supabase.from("events").select(SELECT_FIELDS).eq("event_date", date);
  query = applyType(query);

  const searched = applySearch(query);
  if (searched === null) {
    return res.status(200).json({ data: [] });
  }

  const { data, error } = await searched
    .order("event_start_timestamp", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true })
    .range(rangeFrom, rangeTo);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data: (data ?? []).map(normalizeEvent) });
}

async function handleById({ supabase, req, res }) {
  const id = (req.query.id ?? "").toString().trim();
  if (!id) {
    return res.status(400).json({ error: "id is required for by_id mode" });
  }

  const { data, error } = await supabase
    .from("events")
    .select(SELECT_FIELDS)
    .eq("id", id)
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const event = (data ?? [])[0] ?? null;
  return res.status(200).json({ data: event ? normalizeEvent(event) : null });
}

async function handleEventList({ supabase, req, res, mode, qRaw, applyType, applySearch, rangeFrom, rangeTo }) {
  let query = supabase.from("events").select(SELECT_FIELDS);

  if (mode === "search") {
    if (qRaw.length < 2) {
      return res.status(200).json({ data: [] });
    }
    const fromDate = parseDateParam(req.query.from, "from");

    if (fromDate) {
      query = query.gte("event_date", fromDate);
    }

  } else if (mode === "list") {
    const today = new Date().toISOString().split("T")[0];
    const fromDate = parseDateParam(req.query.from ?? today, "from");
    query = query.gte("event_date", fromDate);

  } else if (mode === "calendar") {
    const start = parseDateParam(req.query.start, "start");
    const end = parseDateParam(req.query.end, "end");

    if (!start || !end) {
      return res.status(400).json({ error: "start and end are required for calendar mode" });
    }
    query = query.gte("event_date", start).lte("event_date", end);

  } else {
    return res.status(400).json({ error: `Unknown mode: ${mode}` });
  }

  query = applyType(query);
  const searched = applySearch(query);
  if (searched === null) {
    return res.status(200).json({ data: [] });
  }

  query = searched;

  query = query
    .order("event_date", { ascending: true })
    .order("event_start_timestamp", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true })
    .range(rangeFrom, rangeTo);

  const { data, error } = await query;
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data: (data ?? []).map(normalizeEvent) });
}

export default async function handler(req, res) {
  try {
    const supabase = supabaseServer();

    const mode = parseMode(req.query.mode);

    const limit = parseIntParam(req.query.limit, 50, { min: 1, max: 200 });
    const offset = parseIntParam(req.query.offset, 0, { min: 0 });
    const rangeFrom = offset;
    const rangeTo = offset + limit - 1;

    const qRaw = decodeURIComponent((req.query.q ?? "").toString().trim()).replace(/\+/g, " ");

    const typeInRaw = (req.query.type_in ?? "").toString().trim();
    const typeInList = typeInRaw ? typeInRaw.split(",").map((s) => s.trim()).filter(Boolean) : null;

    // Resolve slugs to UUIDs (skip for search mode)
    let resolvedTypeIds = null;
    if (mode !== "search" && typeInList && typeInList.length > 0) {
      const { data: typeRows, error: typeError } = await supabase
        .from("event_types")
        .select("id")
        .in("slug", typeInList);

      if (typeError) {
        return res.status(500).json({ error: typeError.message });
      }

      resolvedTypeIds = (typeRows ?? []).map((r) => r.id);

      if (resolvedTypeIds.length === 0) {
        return res.status(200).json({ data: [] });
      }
    }

    // HELPER FILTERS
    const applyType = (query) => {
      if (resolvedTypeIds && resolvedTypeIds.length > 0) {
        return query.in("event_type_id", resolvedTypeIds);
      }
      return query;
    };

    const applySearch = (query) => {
      if (qRaw.length >= 2) {
        const q = escapeLike(qRaw);
        const pattern = `%${q}%`;
        const encoded = pattern.replace(/ /g, "%20");
        return query.or(
          `event_name.ilike.${encoded},event_location.ilike.${encoded},event_business_name.ilike.${encoded}`
        );
      }
      if (qRaw.length > 0) return null;
      return query;
    };

    // CALENDAR DOTS
    if (mode === "calendar_dots") {
      return await handleCalendarDots({ supabase, req, res, applyType, applySearch });
    }

    // DAY
    if (mode === "day") {
      return await handleDay({ supabase, req, res, applyType, applySearch, rangeFrom, rangeTo });
    }

    // BY ID
    if (mode === "by_id") {
      return await handleById({ supabase, req, res });
    }

    // LIST / SEARCH / CALENDAR
    return await handleEventList({ supabase, req, res, mode, qRaw, applyType, applySearch, rangeFrom, rangeTo });
  } catch (err) {
    if (err?.message?.startsWith("Invalid mode:") || err?.message?.includes("must be YYYY-MM-DD")) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: err?.message ?? "Unknown server error" });
  }
}