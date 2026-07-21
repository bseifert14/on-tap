import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import { Check } from "lucide-react";

import formStyles from "../../styles/common/forms.module.css";
import styles from "../../styles/SetPasswordModal.module.css";
import Modal from "../common/Modal";
import FormLabel from "../form/FormLabel";
import PasswordInput from "../inputs/PasswordInput";

interface SetPasswordModalProps {
  onClose: () => void;
}

const passwordRequirements = [
  { label: "Minimum 6 characters", test: (pw1: string) => pw1.length >= 6 },
  { label: "One uppercase character", test: (pw1: string) => /[A-Z]/.test(pw1) },
  { label: "One special character", test: (pw1: string) => /[^A-Za-z0-9]/.test(pw1) },
  { label: "One number", test: (pw1: string) => /[0-9]/.test(pw1) },
  { label: "Passwords match", test: (pw1: string, pw2: string) => pw1 === pw2 && pw1.length > 0 },
];

export default function SetPasswordModal({ onClose }: SetPasswordModalProps) {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      toast.error(error.message || "Failed to set password.");
    } else {
      toast.success("Password set! You're now logged in.");
      window.history.replaceState(null, "", window.location.pathname);
      onClose();
      navigate("/profile");
    }

    setLoading(false);
  };

  const footer = (
    <button
      className={formStyles.buttonPrimary}
      style={{ width: "100%" }}
      disabled={!allValid || loading}
      onClick={handleSubmit}
    >
      {loading ? "Saving..." : "Set Password"}
    </button>
  );

  return (
    <Modal size="compact" title="Welcome to On Tap Stowe" onClose={onClose} footer={footer}>
      <p className={formStyles.helperText}>
        To continue setup, please create your password with the following:
      </p>

      <ul className={styles.checkList}>
        {passwordRequirements.map((req, index) => {
          const met = requirementResults[index];
          return (
            <li
              key={req.label}
              className={`${styles.checkItem} ${met ? styles.checkItemMet : ""}`}
            >
              <span className={styles.checkIcon}>
                {met && <Check size={12} strokeWidth={3} />}
              </span>
              <span>{req.label}</span>
            </li>
          );
        })}
      </ul>

      <FormLabel label="Password" name="password" isRequired />
      <PasswordInput
        id="password"
        value={pw1}
        onChange={(e) => setPw1(e.target.value)}
        required
        showPassword={showPw1}
        onShowPasswordToggle={() => setShowPw1((v) => !v)}
      />

      <FormLabel label="Confirm Password" name="confirmPassword" isRequired />
      <PasswordInput
        id="confirmPassword"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        required
        showPassword={showPw2}
        onShowPasswordToggle={() => setShowPw2((v) => !v)}
      />
    </Modal>
  );
}
