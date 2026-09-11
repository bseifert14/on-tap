import { supabaseServer } from "./_supabaseServer.js";
import { verifyAdmin } from "./_verifyAdmin.js";

const ALLOWED_STATUS = new Set(["pending_review", "approved", "rejected"]);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await verifyAdmin(req);

    const status = (req.query.status || "pending_review").toString();
    if (!ALLOWED_STATUS.has(status)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
    const offset = Math.max(parseInt(req.query.offset || "0", 10), 0);

    const supabase = supabaseServer();
    const { data, error, count } = await supabase
      .from("event_submissions")
      .select("*", { count: "exact" })
      .eq("status", status)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("List submissions failed:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data: data ?? [], total: count ?? 0 });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}
