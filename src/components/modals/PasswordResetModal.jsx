import { useState } from "react";
import { supabase } from "../../supabase";
import styles from "../../styles/PasswordResetModal.module.css";

export default function PasswordResetModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Reset Your Password</h2>
        {sent ? (
          <p>Please check your email for a reset link.</p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleSend}>Send Reset Link</button>
          </>
        )}
        <button onClick={onClose} className={styles.cancel}>
          Close
        </button>
      </div>
    </div>
  );
}
