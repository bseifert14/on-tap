import { useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";

import formStyles from "../../styles/common/forms.module.css";
import Modal from "../common/Modal";
import FormLabel from "../form/FormLabel";
import PasswordResetModal from "./PasswordResetModal";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

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

  const footer = (
    <div className={formStyles.actions}>
      <button className={formStyles.buttonSecondary} onClick={onClose}>
        Cancel
      </button>
      <button className={formStyles.buttonPrimary} onClick={signIn}>
        Log In
      </button>
    </div>
  );

  return (
    <>
      <Modal size="compact" title="Login" onClose={onClose} footer={footer}>
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
          onClick={() => setShowResetModal(true)}
        >
          Forgot password?
        </button>
      </Modal>

      {showResetModal && (
        <PasswordResetModal onClose={() => setShowResetModal(false)} />
      )}
    </>
  );
}
