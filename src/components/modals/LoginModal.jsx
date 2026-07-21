import { useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";

import formStyles from "../../styles/common/forms.module.css";
import styles from "../../styles/LoginModal.module.css";
import Modal from "../common/Modal";
import FormLabel from "../form/FormLabel";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const isLoginView = view === "login";

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      onLoginSuccess?.(data.user);
      onClose();
    }
  };

  const sendResetLink = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setResetSent(true);
    }
  };

  const goToReset = () => setView("reset");
  const backToLogin = () => {
    setView("login");
    setResetSent(false);
  };

  const title = isLoginView ? "Login" : "Reset password";

  const footer = isLoginView ? (
    <div className={formStyles.actions}>
      <button className={formStyles.buttonSecondary} onClick={onClose}>
        Cancel
      </button>
      <button className={formStyles.buttonPrimary} onClick={signIn}>
        Log In
      </button>
    </div>
  ) : (
    <div className={formStyles.actions}>
      <button className={formStyles.buttonSecondary} onClick={backToLogin}>
        Back
      </button>
      {!resetSent && (
        <button className={formStyles.buttonPrimary} onClick={sendResetLink}>
          Send Reset Link
        </button>
      )}
    </div>
  );

  return (
    <Modal size="compact" title={title} onClose={onClose} footer={footer}>
      <div className={styles.sliderContainer}>
        <div className={`${styles.slider} ${!isLoginView ? styles.sliderReset : ""}`}>
          <div className={styles.slide} inert={!isLoginView ? "" : undefined}>
            <FormLabel label="Email" name="email" isRequired />
            <input
              id="email"
              className={formStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <FormLabel label="Password" name="password" isRequired />
            <input
              id="password"
              type="password"
              className={formStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <button
              type="button"
              className={formStyles.linkButton}
              onClick={goToReset}
            >
              Forgot password?
            </button>
          </div>

          <div className={styles.slide} inert={isLoginView ? "" : undefined}>
            {resetSent ? (
              <p className={styles.resetSuccessText}>
                Check your email for a link to reset your password.
              </p>
            ) : (
              <>
                <FormLabel label="Email" name="reset-email" isRequired />
                <input
                  id="reset-email"
                  type="email"
                  className={formStyles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <p className={styles.resetHelperText}>
                  We&apos;ll email you a link to reset your password.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
