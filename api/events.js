import { supabaseServer } from "./_supabaseServer.js";

export default async function handler(req, res) {
    try {
        const supabase = supabaseServer();

        const mode = (req.query.mode ?? "list").toString();
        const limit = Math.min(parseInt(req.query.limit ?? "100", 10), 200);

        const select = `
        id,
        event_type,
        event_name,
        event_location,
        event_date,
        event_start_timestamp,
        event_end_timestamp,
        event_description,
        event_photo_url,
        event_url,
        businesses ( business_name )
        `;

        let query = supabase.from("events").select(select).order("event_date", { ascending: true });

        if (mode === "list") {
            const today = new Date().toISOString().split("T")[0];
            const from = (req.query.from ?? today).toString();
            query = query.gte("event_date", from).limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ data: data ?? [] });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? "Unknown server error" });
    }
}
