import { useEffect, useState } from "react";
import styles from "../../styles/EventModal.module.css";

interface ModalProps {
  onClose: () => void;
  hero?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ onClose, hero, children, footer }: ModalProps) {
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
        {hero ? (
          <div className={styles.modalHero}>
            <button className={styles.iconButton} onClick={handleClose}>✕</button>
            {hero}
          </div>
        ) : (
          <div className={styles.modalHeaderBar}>
            <button className={styles.iconButton} onClick={handleClose}>✕</button>
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.modalBody}>{children}</div>
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </>
  );
}
