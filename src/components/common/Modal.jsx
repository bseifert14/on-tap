import { useEffect, useState } from "react";
import styles from "../../styles/EventModal.module.css";

export default function Modal({ onClose, image, children, footer }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  // Handle fade-out before unmounting (for smoother close)
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200); // Match transition duration
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${visible ? styles.backdropVisible : ""}`}
        onClick={handleClose}
      />
      <div
        className={`${styles.modal} ${visible ? styles.modalVisible : ""}`}
        tabIndex={-1}
      >
        <button className={styles.closeButton} onClick={handleClose}>✕</button>
        {image && image}
        <div className={styles.content}>
          <div className={styles.modalBody}>{children}</div>
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </>
  );
}
