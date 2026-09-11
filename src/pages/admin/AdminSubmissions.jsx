import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import styles from "../../styles/AdminSubmissions.module.css";
import formStyles from "../../styles/common/forms.module.css";
import Modal from "../../components/common/Modal";
import useIsAdmin from "../../utils/hooks/useIsAdmin";
import { supabase } from "../../supabase";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { formatEventDate } from "../../utils/formatDates";

const TABS = [
  { key: "pending_review", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const STATUS_CLASS = {
  pending_review: styles.statusPending,
  approved: styles.statusApproved,
  rejected: styles.statusRejected,
};

const STATUS_LABEL = {
  pending_review: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

async function authFetch(url, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };
  return fetch(url, { ...options, headers });
}

export default function AdminSubmissions() {
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  const [status, setStatus] = useState("pending_review");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsFor, setDetailsFor] = useState(null);
  const [denyingFor, setDenyingFor] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [actionInFlight, setActionInFlight] = useState(false);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/admin-submissions?status=${status}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to load submissions");
      setSubmissions(body.data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (isAdmin) loadSubmissions();
  }, [isAdmin, loadSubmissions]);

  const handleApprove = async (submissionId) => {
    setActionInFlight(true);
    try {
      const res = await authFetch("/api/admin-submissions-approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Approve failed");
      toast.success("Submission approved and published");
      setDetailsFor(null);
      loadSubmissions();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionInFlight(false);
    }
  };

  const handleDeny = async () => {
    if (!denyingFor) return;
    setActionInFlight(true);
    try {
      const res = await authFetch("/api/admin-submissions-deny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: denyingFor.id, rejection_reason: denyReason }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Deny failed");
      toast.success("Submission denied");
      setDenyingFor(null);
      setDenyReason("");
      setDetailsFor(null);
      loadSubmissions();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionInFlight(false);
    }
  };

  if (adminLoading) return <div className={styles.page}>Loading…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Event Submissions</h1>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${status === tab.key ? styles.tabActive : ""}`}
              onClick={() => setStatus(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.emptyState}>Loading submissions…</div>
        ) : submissions.length === 0 ? (
          <div className={styles.emptyState}>No {STATUS_LABEL[status].toLowerCase()} submissions.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Event</th>
                <th>Submitter</th>
                <th>Event Date</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.event_name}</div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>
                      {EVENT_TYPES[s.event_type_slug]?.label || s.event_type_slug}
                    </div>
                  </td>
                  <td>
                    <div>{s.submitter_name}</div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>
                      {s.submitter_email}
                    </div>
                  </td>
                  <td>{formatEventDate(s.event_date)}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.actionCell}>
                      <button
                        className={styles.actionButton}
                        onClick={() => setDetailsFor(s)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {detailsFor && (
        <Modal
          onClose={() => setDetailsFor(null)}
          title="Submission Details"
          size="compact"
          footer={
            detailsFor.status === "pending_review" ? (
              <div className={formStyles.actions}>
                <button
                  className={formStyles.buttonSecondary}
                  onClick={() => setDenyingFor(detailsFor)}
                  disabled={actionInFlight}
                >
                  Deny
                </button>
                <button
                  className={formStyles.buttonPrimary}
                  onClick={() => handleApprove(detailsFor.id)}
                  disabled={actionInFlight}
                >
                  {actionInFlight ? "Working…" : "Approve & Publish"}
                </button>
              </div>
            ) : null
          }
        >
          <SubmissionDetails submission={detailsFor} />
        </Modal>
      )}

      {denyingFor && (
        <Modal
          onClose={() => {
            setDenyingFor(null);
            setDenyReason("");
          }}
          title="Deny submission"
          size="compact"
          footer={
            <div className={formStyles.actions}>
              <button
                className={formStyles.buttonSecondary}
                onClick={() => {
                  setDenyingFor(null);
                  setDenyReason("");
                }}
                disabled={actionInFlight}
              >
                Cancel
              </button>
              <button
                className={formStyles.buttonPrimary}
                onClick={handleDeny}
                disabled={actionInFlight}
              >
                {actionInFlight ? "Working…" : "Confirm deny"}
              </button>
            </div>
          }
        >
          <p style={{ color: "var(--color-text-muted)", fontSize: 13, marginTop: 0 }}>
            The submitter will get an email with this reason. Any uploaded photo will be deleted.
          </p>
          <textarea
            className={formStyles.textarea}
            placeholder="Reason (shared with submitter)…"
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
            autoFocus
          />
        </Modal>
      )}
    </div>
  );
}

function SubmissionDetails({ submission }) {
  const badgeClass = `${styles.statusBadge} ${STATUS_CLASS[submission.status] || ""}`;
  return (
    <>
      <div className={styles.detailsSection}>
        <span className={badgeClass}>{STATUS_LABEL[submission.status]}</span>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Submitter</div>
        <div className={styles.detailsValue}>
          {submission.submitter_name} — {submission.submitter_email}
        </div>
      </div>

      <hr className={styles.detailsDivider} />

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Event Name</div>
        <div className={styles.detailsValue}>{submission.event_name}</div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Business</div>
        <div className={styles.detailsValue}>{submission.event_business_name}</div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Type</div>
        <div className={styles.detailsValue}>
          {EVENT_TYPES[submission.event_type_slug]?.label || submission.event_type_slug}
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Location</div>
        <div className={styles.detailsValue}>{submission.event_location}</div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Date</div>
        <div className={styles.detailsValue}>{formatEventDate(submission.event_date)}</div>
      </div>

      {submission.event_start_timestamp && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsLabel}>Start</div>
          <div className={styles.detailsValue}>
            {new Date(submission.event_start_timestamp).toLocaleString()}
          </div>
        </div>
      )}

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Description</div>
        <div className={styles.detailsValue}>{submission.event_description}</div>
      </div>

      {submission.event_url && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsLabel}>Link</div>
          <div className={styles.detailsValue}>{submission.event_url}</div>
        </div>
      )}

      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel}>Audience</div>
        <div className={styles.detailsValue}>
          {submission.event_min_age === 0 ? "All Ages" : `${submission.event_min_age}+`}
        </div>
      </div>

      {submission.event_photo_path && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsLabel}>Photo</div>
          <div className={styles.detailsValue}>{submission.event_photo_path}</div>
        </div>
      )}

      {submission.status === "rejected" && submission.rejection_reason && (
        <>
          <hr className={styles.detailsDivider} />
          <div className={styles.detailsSection}>
            <div className={styles.detailsLabel}>Rejection Reason</div>
            <div className={styles.detailsValue}>{submission.rejection_reason}</div>
          </div>
        </>
      )}

      {submission.reviewed_by && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsLabel}>Reviewed By</div>
          <div className={styles.detailsValue}>
            {submission.reviewed_by} on {new Date(submission.reviewed_at).toLocaleString()}
          </div>
        </div>
      )}
    </>
  );
}
