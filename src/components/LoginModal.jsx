import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/LoginModal.module.css";
import PasswordResetModal from "./PasswordResetModal";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => onClose())
      .catch((err) => alert(err.message));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Login</h3>
        <input
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className={styles.buttonRow}>
          <button className={styles.button} onClick={signIn}>Log In</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button onClick={() => setShowResetModal(true)}>Forgot Password?</button>
        </div>
      </div>
      {showResetModal && (
        <PasswordResetModal onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
}
