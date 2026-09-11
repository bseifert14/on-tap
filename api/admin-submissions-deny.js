import Stripe from "stripe";
import { supabaseServer } from "./_supabaseServer.js";
import { verifyAdmin } from "./_verifyAdmin.js";
import { sendSubmissionDenied } from "./_emails.js";

function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const admin = await verifyAdmin(req);

    const { submissionId, rejection_reason } = req.body || {};
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

    // Refund via Stripe before mutating anything else. If the refund fails,
    // don't cleanup or update — leave the submission in pending_review so
    // the admin can retry (or handle the refund manually in Stripe dashboard).
    let refundId = null;
    if (submission.payment_intent_id) {
      try {
        const refund = await stripe().refunds.create({
          payment_intent: submission.payment_intent_id,
          reason: "requested_by_customer",
        });
        refundId = refund.id;
      } catch (err) {
        console.error("Stripe refund failed:", err);
        return res.status(502).json({
          error: `Refund failed: ${err?.message || "Unknown Stripe error"}. Submission was not denied.`,
        });
      }
    }

    // Clean up uploaded photo if present.
    if (submission.event_photo_path) {
      const { error: rmErr } = await supabase.storage
        .from("event-photos")
        .remove([submission.event_photo_path]);
      if (rmErr) console.error("Photo cleanup failed:", rmErr);
    }

    const { error: updateErr } = await supabase
      .from("event_submissions")
      .update({
        status: "rejected",
        rejection_reason: (rejection_reason || "").toString().trim() || null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: admin.email,
      })
      .eq("id", submissionId);

    if (updateErr) {
      return res.status(500).json({ error: updateErr.message });
    }

    if (refundId) console.log("Refund issued:", refundId, "for submission", submissionId);

    try {
      const emailRes = await sendSubmissionDenied({ submission, reason: rejection_reason });
      if (emailRes?.error) {
        console.error("Email [submitter-denied] Resend error:", emailRes.error);
      }
    } catch (e) {
      console.error("Email [submitter-denied] threw:", e);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}
