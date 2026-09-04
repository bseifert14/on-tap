import formStyles from "../../styles/common/forms.module.css";
import Modal from "../common/Modal";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  const footer = (
    <div className={formStyles.actions}>
      <button className={formStyles.buttonSecondary} onClick={onCancel}>
        Cancel
      </button>
      <button className={formStyles.buttonPrimary} onClick={onConfirm}>
        Yes, Delete
      </button>
    </div>
  );

  return (
    <Modal size="compact" title="Delete event" onClose={onCancel} footer={footer}>
      <p style={{ color: "var(--color-white)", margin: 0 }}>
        Are you sure you want to delete this event? This action cannot be undone.
      </p>
    </Modal>
  );
}
