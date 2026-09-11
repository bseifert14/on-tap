import { randomUUID } from "crypto";
import Stripe from "stripe";
import { supabaseServer } from "./_supabaseServer.js";
import { sendAdminNewSubmission, sendSubmissionReceived } from "./_emails.js";

const REQUIRED_EVENT_FIELDS = [
  "event_name",
  "event_location",
  "event_business_name",
  "event_type_slug",
  "event_date",
  "event_description",
];

const ALLOWED_PHOTO_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
const EXPECTED_AMOUNT_CENTS = 2500;

function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key);
}

function bad(res, status, message) {
  return res.status(status).json({ error: message });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return bad(res, 405, "Method not allowed");
  }

  try {
    const body = req.body || {};
    const { submitter_name, submitter_email, event, photo, payment_intent_id } = body;

    if (!submitter_name || typeof submitter_name !== "string") {
      return bad(res, 400, "submitter_name is required");
    }
    if (!submitter_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitter_email)) {
      return bad(res, 400, "Valid submitter_email is required");
    }
    if (!event || typeof event !== "object") {
      return bad(res, 400, "event payload is required");
    }
    for (const field of REQUIRED_EVENT_FIELDS) {
      if (!event[field]) return bad(res, 400, `event.${field} is required`);
    }
    if (!payment_intent_id || typeof payment_intent_id !== "string") {
      return bad(res, 400, "payment_intent_id is required");
    }

    let intent;
    try {
      intent = await stripe().paymentIntents.retrieve(payment_intent_id);
    } catch (err) {
      console.error("Stripe retrieve failed:", err);
      return bad(res, 400, "Invalid payment_intent_id");
    }
    if (intent.status !== "succeeded") {
      return bad(res, 402, `Payment not completed (status: ${intent.status})`);
    }
    if (intent.amount !== EXPECTED_AMOUNT_CENTS) {
      return bad(res, 402, "Payment amount mismatch");
    }

    const supabase = supabaseServer();

    const { data: existing } = await supabase
      .from("event_submissions")
      .select("id")
      .eq("payment_intent_id", payment_intent_id)
      .maybeSingle();
    if (existing) {
      return res.status(200).json({ id: existing.id, duplicate: true });
    }

    // Optional photo upload
    let event_photo_path = null;
    if (photo?.data) {
      if (!ALLOWED_PHOTO_MIME.has(photo.contentType)) {
        return bad(res, 400, "Photo must be JPG, PNG, or WebP");
      }
      const bytes = Buffer.from(photo.data, "base64");
      if (bytes.length > MAX_PHOTO_BYTES) {
        return bad(res, 400, "Photo must be under 3MB");
      }
      const ext = (photo.ext || photo.contentType.split("/")[1] || "jpg").toLowerCase();
      event_photo_path = `submissions/${randomUUID()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("event-photos")
        .upload(event_photo_path, bytes, {
          contentType: photo.contentType,
          upsert: false,
        });

      if (uploadErr) {
        console.error("Photo upload failed:", uploadErr);
        return bad(res, 500, "Photo upload failed");
      }
    }

    const insertRow = {
      submitter_name: submitter_name.trim(),
      submitter_email: submitter_email.trim().toLowerCase(),
      event_name: event.event_name,
      event_location: event.event_location,
      event_business_name: event.event_business_name,
      event_type_slug: event.event_type_slug,
      event_date: event.event_date,
      event_start_timestamp: event.event_start_timestamp || null,
      event_end_timestamp: event.event_end_timestamp || null,
      event_description: event.event_description,
      event_url: event.event_url || null,
      event_photo_path,
      is_kid_friendly: event.is_kid_friendly ?? true,
      is_18_plus: event.is_18_plus ?? false,
      is_21_plus: event.is_21_plus ?? false,
      event_min_age: event.event_min_age ?? 0,
      payment_intent_id,
      amount_cents: intent.amount,
    };

    const { data, error } = await supabase
      .from("event_submissions")
      .insert(insertRow)
      .select()
      .single();

    if (error) {
      console.error("Submission insert failed:", error);
      return bad(res, 500, "Could not save submission");
    }

    const emailResults = await Promise.allSettled([
      sendSubmissionReceived({ submission: data }),
      sendAdminNewSubmission({ submission: data }),
    ]);
    const labels = ["submitter-received", "admin-new-submission"];
    emailResults.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`Email [${labels[i]}] promise rejected:`, r.reason);
      } else if (r.value?.error) {
        console.error(`Email [${labels[i]}] Resend error:`, r.value.error);
      }
    });

    return res.status(201).json({ id: data.id });
  } catch (err) {
    console.error("submissions handler error:", err);
    return bad(res, 500, err?.message || "Unknown server error");
  }
}
