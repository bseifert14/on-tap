import { supabaseServer } from "./_supabaseServer.js";
import { verifyAdmin } from "./_verifyAdmin.js";
import { sendSubmissionApproved } from "./_emails.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const admin = await verifyAdmin(req);

    const { submissionId } = req.body || {};
    if (!submissionId) return res.status(400).json({ error: "submissionId is required" });

    const supabase = supabaseServer();

    const { data: submission, error: fetchErr } = await supabase
      .from("event_submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (fetchErr || !submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    if (submission.status !== "pending_review") {
      return res.status(409).json({ error: `Submission is already ${submission.status}` });
    }

    // Resolve slug → event_type_id
    const { data: typeRow, error: typeErr } = await supabase
      .from("event_types")
      .select("id")
      .eq("slug", submission.event_type_slug)
      .single();

    if (typeErr || !typeRow) {
      return res.status(400).json({ error: `Unknown event type slug: ${submission.event_type_slug}` });
    }

    // Insert into events. Admin owns the row (created_by = admin's user id).
    const eventRow = {
      event_name: submission.event_name,
      event_location: submission.event_location,
      event_business_name: submission.event_business_name,
      event_type_id: typeRow.id,
      event_date: submission.event_date,
      event_start_timestamp: submission.event_start_timestamp,
      event_end_timestamp: submission.event_end_timestamp,
      event_description: submission.event_description,
      event_url: submission.event_url,
      event_photo_path: submission.event_photo_path,
      is_kid_friendly: submission.is_kid_friendly,
      is_18_plus: submission.is_18_plus,
      is_21_plus: submission.is_21_plus,
      event_min_age: submission.event_min_age,
      created_by: admin.userId,
      is_recurring: false,
      recurrence_frequency: null,
      recurrence_end_date: null,
      recurrence_id: null,
    };

    const { data: inserted, error: insertErr } = await supabase
      .from("events")
      .insert(eventRow)
      .select("id")
      .single();

    if (insertErr) {
      console.error("events insert failed:", insertErr);
      return res.status(500).json({ error: insertErr.message });
    }

    const { error: updateErr } = await supabase
      .from("event_submissions")
      .update({
        status: "approved",
        published_event_id: inserted.id,
        reviewed_at: new Date().toISOString(),
        reviewed_by: admin.email,
      })
      .eq("id", submissionId);

    if (updateErr) {
      console.error("submission update failed after event insert:", updateErr);
      return res.status(500).json({ error: updateErr.message });
    }

    try {
      const emailRes = await sendSubmissionApproved({ submission, eventId: inserted.id });
      if (emailRes?.error) {
        console.error("Email [submitter-approved] Resend error:", emailRes.error);
      }
    } catch (e) {
      console.error("Email [submitter-approved] threw:", e);
    }

    return res.status(200).json({ published_event_id: inserted.id });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}
