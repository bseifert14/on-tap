import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

import styles from "../../styles/SetPasswordModal.module.css";

export default function SetPasswordModal({ onClose }) {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: "Minimum characters 6", test: (pw1) => pw1.length >= 6 },
    { label: "One uppercase character", test: (pw1) => /[A-Z]/.test(pw1) },
    { label: "One special character", test: (pw1) => /[^A-Za-z0-9]/.test(pw1) },
    { label: "One number", test: (pw1) => /[0-9]/.test(pw1) },
    { label: "Passwords match", test: (pw1, pw2) => pw1 === pw2 && pw1.length > 0 },
  ];

  const requirementResults = useMemo(
    () => passwordRequirements.map((req) => req.test(pw1, pw2)),
    [pw1, pw2]
  );

  const allValid = requirementResults.every(Boolean);

  const handleSubmit = async () => {
    if (!allValid) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw1 });

    if (error) {
      toast.error("Failed to set password.");
    } else {
      toast.success("Password set! You're now logged in.");
      window.history.replaceState(null, "", window.location.pathname);
      onClose();
      navigate("/profile");
    }

    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Welcome to On Tap Stowe</h2>
        <p className={styles.descriptionText}>
          To continue setup, please create your password with the following:
        </p>

        <ul className={styles.requirementsList}>
          {passwordRequirements.map((req, index) => {
            const passed = requirementResults[index];
            return (
              <li
                key={index}
                className={passed ? styles.requirementMet : styles.requirementUnmet}
              >
                {passed ? (
                  <CheckCircle size={16} color="green" />
                ) : (
                  <span className={styles.bullet}>&bull;</span>
                )}
                <span>{req.label}</span>
              </li>
            );
          })}
        </ul>

        <form className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              className={styles.formInput}
              placeholder="Set password..."
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              className={styles.formInput}
              placeholder="Confirm password..."
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </div>
        </form>

        <button
          onClick={handleSubmit}
          disabled={!allValid || loading}
          className={styles.submitButton}
        >
          {loading ? "Saving..." : "Set Password"}
        </button>
      </div>
    </div>
  );
}
