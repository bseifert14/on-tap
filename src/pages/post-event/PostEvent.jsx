import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle2, Eye } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import styles from "../../styles/PostEvent.module.css";
import formStyles from "../../styles/common/forms.module.css";
import EventFormFields from "../../components/events/EventFormFields";
import FormLabel from "../../components/form/FormLabel";
import resizeImageIfNeeded from "../../utils/resizeImageIfNeeded";
import { formatTime } from "../../utils/formatDates";
import { EVENT_TYPES } from "../../constants/eventTypes";
import StepIndicator from "./StepIndicator";
import PostEventPreviewModal from "./PostEventPreviewModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const STRIPE_APPEARANCE = {
  theme: "night",
  variables: {
    colorPrimary: "#c8232c",
    colorBackground: "#1a1a1a",
    colorText: "#ffffff",
    colorDanger: "#ff4d5a",
    fontFamily: "'DM Sans', sans-serif",
    borderRadius: "8px",
  },
};

const INITIAL_FORM = {
  event_name: "",
  event_location: "",
  event_business_name: "",
  event_type: "",
  event_date: "",
  event_start_timestamp: "",
  event_end_timestamp: "",
  event_description: "",
  event_url: "",
  event_photo_path: "",
  is_recurring: false,
  is_kid_friendly: true,
  is_18_plus: false,
  is_21_plus: false,
  event_min_age: 0,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const base64 = String(result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PostEvent() {
  const [step, setStep] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initializingPayment, setInitializingPayment] = useState(false);

  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateAndProcessFile = async (file) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.warning("Only JPG, PNG, or WebP images are allowed.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.warning("Image must be smaller than 3MB.");
      return;
    }
    const resized = await resizeImageIfNeeded(file);
    setSelectedFile(resized);
  };

  const missingStep1Fields = [];
  if (!submitterName.trim()) missingStep1Fields.push("Your Name");
  if (!EMAIL_RE.test(submitterEmail.trim())) missingStep1Fields.push("Your Email");
  if (!form.event_name) missingStep1Fields.push("Event Name");
  if (!form.event_type) missingStep1Fields.push("Event Type");
  if (!form.event_location) missingStep1Fields.push("Event Address");
  if (!form.event_business_name) missingStep1Fields.push("Event Business Name");
  if (!form.event_date) missingStep1Fields.push("Event Date");
  if (!form.event_start_timestamp) missingStep1Fields.push("Start Time");
  if (!form.event_description) missingStep1Fields.push("Description");

  const step1Valid = missingStep1Fields.length === 0;

  const initPaymentIntent = async () => {
    setInitializingPayment(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submitter_email: submitterEmail.trim(),
          event_name: form.event_name,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not initialize payment");
      setClientSecret(body.clientSecret);
      return true;
    } catch (err) {
      toast.error(err.message || "Could not initialize payment");
      return false;
    } finally {
      setInitializingPayment(false);
    }
  };

  const goNext = async () => {
    if (step === 1) {
      if (!step1Valid) {
        toast.warning(`Missing: ${missingStep1Fields.join(", ")}`);
        return;
      }
      if (!clientSecret) {
        const ok = await initPaymentIntent();
        if (!ok) return;
      }
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  if (success) {
    return (
      <div className={styles.page}>
        <div className={`${styles.card} ${styles.successCard}`}>
          <CheckCircle2 size={56} strokeWidth={1.5} className={styles.successIcon} />
          <h2 className={styles.successTitle}>Submission received!</h2>
          <p className={styles.successText}>
            Thanks for submitting your event. We'll review it within 24 hours and email you at{" "}
            <strong>{submitterEmail}</strong> with a decision.
          </p>
          <Link to="/" className={formStyles.buttonPrimary}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const paymentStepsProps = {
    step,
    setStep,
    goBack,
    form,
    submitterName,
    submitterEmail,
    selectedFile,
    paymentError,
    setPaymentError,
    onSuccess: () => setSuccess(true),
  };

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.introTitle}>Submit an Event</h1>
        <p className={styles.introText}>
          Post an event with us. Add the details below and we'll get it posted within 24 hours after review.
        </p>
      </div>

      <StepIndicator currentStep={step} />

      {step === 1 && (
        <Step1Card
          form={form}
          handleChange={handleChange}
          submitterName={submitterName}
          setSubmitterName={setSubmitterName}
          submitterEmail={submitterEmail}
          setSubmitterEmail={setSubmitterEmail}
          selectedFile={selectedFile}
          validateAndProcessFile={validateAndProcessFile}
          fileInputRef={fileInputRef}
          step1Valid={step1Valid}
          missingStep1Fields={missingStep1Fields}
          setPreviewOpen={setPreviewOpen}
          goNext={goNext}
          initializingPayment={initializingPayment}
        />
      )}

      {step > 1 && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
        >
          <PaymentSteps {...paymentStepsProps} />
        </Elements>
      )}

      {previewOpen && (
        <PostEventPreviewModal
          form={form}
          selectedFile={selectedFile}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}

function Step1Card({
  form,
  handleChange,
  submitterName,
  setSubmitterName,
  submitterEmail,
  setSubmitterEmail,
  selectedFile,
  validateAndProcessFile,
  fileInputRef,
  step1Valid,
  missingStep1Fields,
  setPreviewOpen,
  goNext,
  initializingPayment,
}) {
  return (
    <div className={styles.card}>
      <h3 className={styles.sectionTitle}>Your Contact Info</h3>
      <FormLabel label="Your Name" name="submitter_name" isRequired />
      <input
        className={formStyles.input}
        value={submitterName}
        onChange={(e) => setSubmitterName(e.target.value)}
      />

      <FormLabel label="Your Email" name="submitter_email" isRequired />
      <input
        className={formStyles.input}
        type="email"
        value={submitterEmail}
        onChange={(e) => setSubmitterEmail(e.target.value)}
      />

      <hr className={styles.reviewDivider} />

      <h3 className={styles.sectionTitle}>Event Details</h3>
      <EventFormFields
        form={form}
        handleChange={handleChange}
        fileInputRef={fileInputRef}
        selectedFile={selectedFile}
        validateAndProcessFile={validateAndProcessFile}
        allowRecurring={false}
      />

      <div className={styles.footerBar}>
        <button
          type="button"
          className={formStyles.buttonSecondary}
          onClick={() => setPreviewOpen(true)}
          disabled={!step1Valid}
          title={step1Valid ? "" : `Fill required fields to preview: ${missingStep1Fields.join(", ")}`}
        >
          <Eye size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
          Preview
        </button>
        <div className={styles.footerBarRight}>
          <button
            type="button"
            className={formStyles.buttonPrimary}
            onClick={goNext}
            disabled={initializingPayment}
          >
            {initializingPayment ? "Preparing…" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentSteps({
  step,
  setStep,
  goBack,
  form,
  submitterName,
  submitterEmail,
  selectedFile,
  paymentError,
  setPaymentError,
  onSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const typeLabel = EVENT_TYPES[form.event_type]?.label || "";

  const handleFinalSubmit = async () => {
    if (!stripe || !elements) {
      toast.error("Payment not ready. Please wait a moment and try again.");
      return;
    }
    setSubmitting(true);
    setPaymentError(null);

    const { error: stripeErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeErr) {
      setPaymentError(stripeErr.message || "Payment failed. Please try a different card.");
      setStep(2);
      setSubmitting(false);
      return;
    }

    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      setPaymentError("Payment did not complete. Please try again.");
      setStep(2);
      setSubmitting(false);
      return;
    }

    try {
      let photo = null;
      if (selectedFile) {
        const data = await fileToBase64(selectedFile);
        const ext = (selectedFile.name.split(".").pop() || "jpg").toLowerCase();
        photo = { data, contentType: selectedFile.type, ext };
      }

      const payload = {
        submitter_name: submitterName.trim(),
        submitter_email: submitterEmail.trim(),
        payment_intent_id: paymentIntent.id,
        event: {
          event_name: form.event_name,
          event_type_slug: form.event_type,
          event_location: form.event_location,
          event_business_name: form.event_business_name,
          event_date: form.event_date,
          event_start_timestamp: form.event_start_timestamp
            ? `${form.event_date}T${form.event_start_timestamp}:00`
            : null,
          event_end_timestamp: form.event_end_timestamp
            ? `${form.event_date}T${form.event_end_timestamp}:00`
            : null,
          event_description: form.event_description,
          event_url: form.event_url || null,
          event_min_age: form.event_min_age,
          is_kid_friendly: form.event_min_age === 0,
          is_18_plus: form.event_min_age >= 18,
          is_21_plus: form.event_min_age >= 21,
        },
        photo,
      };

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(
        `${err.message || "Submission failed"}. Please contact team@ontap-events.com so we can help.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      {/* PaymentElement stays mounted across steps 2 and 3 so
          stripe.confirmPayment() can find it on final submit. */}
      <div style={{ display: step === 2 ? "block" : "none" }}>
        <h3 className={styles.sectionTitle}>Payment</h3>
        <p className={styles.helperTextTop}>
          Flat fee: <strong style={{ color: "var(--color-white)" }}>$25</strong>. Refunded automatically if we don't approve your event.
        </p>

        <PaymentElement />

        {paymentError && (
          <div className={styles.paymentError}>{paymentError}</div>
        )}

        <div className={styles.footerBar}>
          <button
            type="button"
            className={formStyles.buttonSecondary}
            onClick={goBack}
          >
            Back
          </button>
          <div className={styles.footerBarRight}>
            <button
              type="button"
              className={formStyles.buttonPrimary}
              onClick={() => setStep(3)}
            >
              Continue to Review
            </button>
          </div>
        </div>
      </div>

      {step === 3 && (
        <>
          <h3 className={styles.sectionTitle}>Review Your Submission</h3>

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Submitter</div>
            <div className={styles.reviewValue}>
              {submitterName} | {submitterEmail}
            </div>
          </div>

          <hr className={styles.reviewDivider} />

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Event</div>
            <div className={styles.reviewValue}>
              <strong>{form.event_name}</strong> ({typeLabel})
            </div>
          </div>

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Business</div>
            <div className={styles.reviewValue}>{form.event_business_name}</div>
          </div>

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Location</div>
            <div className={styles.reviewValue}>{form.event_location}</div>
          </div>

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Date & Time</div>
            <div className={styles.reviewValue}>
              {form.event_date}
              {form.event_start_timestamp && ` • ${formatTime(form.event_start_timestamp)}`}
              {form.event_end_timestamp && ` – ${formatTime(form.event_end_timestamp)}`}
            </div>
          </div>

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Description</div>
            <div className={styles.reviewValue} style={{ whiteSpace: "pre-wrap" }}>
              {form.event_description}
            </div>
          </div>

          {form.event_url && (
            <div className={styles.reviewSection}>
              <div className={styles.reviewLabel}>Link</div>
              <div className={styles.reviewValue}>{form.event_url}</div>
            </div>
          )}

          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Audience</div>
            <div className={styles.reviewValue}>
              {form.event_min_age === 0 ? "All Ages" : `${form.event_min_age}+`}
            </div>
          </div>

          {selectedFile && (
            <div className={styles.reviewSection}>
              <div className={styles.reviewLabel}>Photo</div>
              <div className={styles.reviewValue}>{selectedFile.name}</div>
            </div>
          )}

          <hr className={styles.reviewDivider} />
          <div className={styles.reviewSection}>
            <div className={styles.reviewLabel}>Payment</div>
            <div className={styles.reviewValue}>
              $25. Charged when you click Confirm & Submit
            </div>
          </div>

          <div className={styles.footerBar}>
            <button
              type="button"
              className={formStyles.buttonSecondary}
              onClick={goBack}
              disabled={submitting}
            >
              Back
            </button>
            <div className={styles.footerBarRight}>
              <button
                type="button"
                className={formStyles.buttonPrimary}
                onClick={handleFinalSubmit}
                disabled={submitting || !stripe || !elements}
              >
                {submitting ? "Processing…" : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
