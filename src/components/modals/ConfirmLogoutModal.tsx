import formStyles from "../../styles/common/forms.module.css";
import Modal from "../common/Modal";

interface ConfirmLogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLogoutModal({ onConfirm, onCancel }: ConfirmLogoutModalProps) {
  const footer = (
    <div className={formStyles.actions}>
      <button className={formStyles.buttonSecondary} onClick={onCancel}>
        Cancel
      </button>
      <button className={formStyles.buttonPrimary} onClick={onConfirm}>
        Log Out
      </button>
    </div>
  );

  return (
    <Modal size="compact" title="Log out" onClose={onCancel} footer={footer}>
      <p style={{ color: "var(--color-white)", margin: 0 }}>
        Are you sure you want to log out?
      </p>
    </Modal>
  );
}
