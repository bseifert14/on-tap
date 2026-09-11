import { Resend } from "resend";

const FROM_ADDRESS = process.env.RESEND_FROM || "OnTap Events <events@ontap-events.com>";
const NOTIFICATION_EMAILS = (
  process.env.SUBMISSION_NOTIFICATION_EMAILS ||
  process.env.ADMIN_EMAILS ||
  ""
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function shell(title, bodyHtml) {
  return `<!doctype html>
<html>
  <body style="font-family: system-ui, -apple-system, sans-serif; background:#111; color:#fff; padding:24px; margin:0;">
    <div style="max-width:560px; margin:0 auto; background:#1c1c1c; border-radius:12px; padding:28px;">
      <h2 style="margin:0 0 16px 0; font-size:20px;">${title}</h2>
      ${bodyHtml}
    </div>
  </body>
</html>`;
}

function fmtEvent(sub) {
  return `
    <p style="margin:0 0 8px 0;"><strong>${escape(sub.event_name)}</strong></p>
    <p style="margin:0 0 4px 0; color:#aaa;">${escape(sub.event_business_name)}</p>
    <p style="margin:0 0 4px 0; color:#aaa;">${escape(sub.event_location)}</p>
    <p style="margin:0 0 4px 0; color:#aaa;">${escape(sub.event_date)}</p>
  `;
}

function escape(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

export async function sendSubmissionReceived({ submission }) {
  const resend = client();
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: submission.submitter_email,
    subject: "We received your event submission",
    html: shell(
      "Thanks for submitting your event",
      `<p>Hi ${escape(submission.submitter_name)},</p>
       <p>We received your submission and will review it within 24 hours. You'll get another email once we've made a decision.</p>
       <hr style="border:none; border-top:1px solid #333; margin:20px 0;">
       ${fmtEvent(submission)}`
    ),
  });
}

export async function sendSubmissionApproved({ submission, eventId }) {
  const resend = client();
  const link = `https://ontap-events.com/events/${eventId}`;
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: submission.submitter_email,
    subject: "Your event is live",
    html: shell(
      "Your event is live",
      `<p>Hi ${escape(submission.submitter_name)},</p>
       <p>Your event has been approved and is now live on OnTap Events.</p>
       <p><a href="${link}" style="color:#c8232c;">View your event</a></p>
       <hr style="border:none; border-top:1px solid #333; margin:20px 0;">
       ${fmtEvent(submission)}`
    ),
  });
}

export async function sendSubmissionDenied({ submission, reason }) {
  const resend = client();
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: submission.submitter_email,
    subject: "About your event submission",
    html: shell(
      "We couldn't post your event",
      `<p>Hi ${escape(submission.submitter_name)},</p>
       <p>Unfortunately we're unable to post the event you submitted. ${reason ? "Reason:" : ""}</p>
       ${reason ? `<blockquote style="border-left:3px solid #c8232c; padding-left:12px; color:#ddd; margin:12px 0;">${escape(reason)}</blockquote>` : ""}
       <p>Your payment has been refunded.</p>
       <hr style="border:none; border-top:1px solid #333; margin:20px 0;">
       ${fmtEvent(submission)}`
    ),
  });
}

export async function sendAdminNewSubmission({ submission }) {
  if (NOTIFICATION_EMAILS.length === 0) return;
  const resend = client();
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFICATION_EMAILS,
    subject: `New event submission: ${submission.event_name}`,
    html: shell(
      "New event submission",
      `<p>A new submission is waiting for review.</p>
       <p><strong>Submitter:</strong> ${escape(submission.submitter_name)} (${escape(submission.submitter_email)})</p>
       <hr style="border:none; border-top:1px solid #333; margin:20px 0;">
       ${fmtEvent(submission)}
       <p style="margin-top:20px;"><a href="https://ontap-events.com/admin/submissions" style="color:#c8232c;">Review in admin panel</a></p>`
    ),
  });
}
