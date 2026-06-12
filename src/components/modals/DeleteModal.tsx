import styles from '../../styles/AddEditEventModal.module.css'
import buttonStyle from "../../styles/common/Button.module.css";
import Button from '../common/Button';

interface DeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
    return (
      <div className={styles.eventModalOverlay}>
          <div className={styles.eventModalBox}>
              <h3>Are you sure you want to delete this event?</h3>
              <div className={styles.actionButtonContainer}>
                  <Button onClick={onConfirm} className={buttonStyle.primaryButton}>
                    Yes, Delete
                  </Button>
                  <Button onClick={onCancel} className={buttonStyle.secondaryButton}>
                    Cancel
                  </Button>
              </div>
          </div>
      </div>
  );
}