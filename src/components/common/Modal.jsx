import styles from "../../styles/EventModal.module.css";

export default function Modal({ onClose, image, children, footer }) {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        { image && image }
        <div className={styles.content}>
          <div className={styles.modalBody}>
            {children}
          </div>
        </div>
        { footer && (
            <div className={styles.modalFooter}>
                {footer}
            </div>
        )}
      </div>
    </>
  );
}
