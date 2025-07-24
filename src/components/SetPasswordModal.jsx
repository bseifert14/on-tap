import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import styles from "../styles/SetPasswordModal.module.css";
import { CheckCircle } from "lucide-react";

export default function SetPasswordModal({ onClose }) {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMatch(pw1 && pw2 && pw1 === pw2);
  }, [pw1, pw2]);

  const handleSubmit = async () => {
    if (!match || !pw1) return;
    setLoading(true);

    const { error: pwError } = await supabase.auth.updateUser({ password: pw1 });

    if (pwError) {
      alert("Failed to set password.");
      setLoading(false);
      return;
    }

    alert("Password set! You're now logged in.");
    window.history.replaceState(null, "", window.location.pathname);
    setLoading(false);
    onClose();
    navigate("/profile");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Welcome to On Tap Stowe</h2>
        <p>To continue setup, please create your password:</p>

        <input
          type="password"
          placeholder="New Password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />

        {pw1 && pw2 && (
          <div className={styles.matchRow}>
            {match ? (
              <>
                <CheckCircle size={18} color="green" />
                <span className={styles.matchText}>Passwords match</span>
              </>
            ) : (
              <span style={{ color: "red" }}>Passwords do not match</span>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!match || loading}
          className={styles.submitButton}
        >
          {loading ? "Saving..." : "Set Password"}
        </button>
      </div>
    </div>
  );
}
