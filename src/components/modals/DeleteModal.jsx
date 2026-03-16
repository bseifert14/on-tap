import styles from '../../styles/AddEditEventModal.module.css'
import buttonStyle from "../../styles/common/Button.module.css";
import Button from '../common/Button';

export default function DeleteModal({ onConfirm, onCancel }) {
    return (
      <div className={styles["eventModal-overlay"]}>
        <div className={styles["eventModal-box"]}>
          <h3>Are you sure you want to delete this event?</h3>
          <div style={actionButtonContainer}>
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
  
  const actionButtonContainer = {
    display: 'flex',
    justifyContent: 'right',
    columnGap: '15px',
    paddingTop: '20px'
  };
  