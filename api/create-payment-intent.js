import Stripe from "stripe";

const AMOUNT_CENTS = 2500;
const CURRENCY = "usd";

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
    const { submitter_email, event_name } = req.body || {};

    const intent = await stripe().paymentIntents.create({
      amount: AMOUNT_CENTS,
      currency: CURRENCY,
      payment_method_types: ['card'],
      receipt_email: submitter_email || undefined,
      description: event_name ? `OnTap event submission: ${event_name}` : "OnTap event submission",
      metadata: {
        submitter_email: submitter_email || "",
        event_name: event_name || "",
      },
    });

    return res.status(200).json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amountCents: AMOUNT_CENTS,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return res.status(500).json({ error: err?.message || "Failed to create payment intent" });
  }
}
