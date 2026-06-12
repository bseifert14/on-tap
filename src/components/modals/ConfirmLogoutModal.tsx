import styles from "../../styles/ConfirmLogoutModal.module.css";

interface ConfirmLogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLogoutModal({ onConfirm, onCancel }: ConfirmLogoutModalProps) {
  return (
    <div className={styles.overlayStyle}>
      <div className={styles.modalStyle}>
        <h3>Are you sure you want to log out?</h3>
        <div style={{ marginTop: 20 }}>
          <button onClick={onConfirm} className={styles.confirmButton}>Log Out</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
}