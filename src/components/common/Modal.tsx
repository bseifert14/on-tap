import { useEffect, useState } from "react";
import styles from "../../styles/EventModal.module.css";

interface ModalProps {
  onClose: () => void;
  hero?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "default" | "compact";
}

export default function Modal({ onClose, hero, title, children, footer, size = "default" }: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${visible ? styles.backdropVisible : ""}`}
        onClick={handleClose}
      />
      <div
        className={`${styles.modal} ${visible ? styles.modalVisible : ""} ${size === "compact" ? styles.modalCompact : ""}`}
        tabIndex={-1}
      >
        {hero ? (
          <div className={styles.modalHero}>
            <button
              className={styles.iconButton}
              onClick={handleClose}
              type="button"
              aria-label="Close modal"
            >
                ✕
            </button>
            {hero}
          </div>
        ) : (
          <div className={`${styles.modalHeaderBar} ${title ? styles.modalHeaderBarWithTitle : ""}`}>
            {title && <h3 className={styles.modalHeaderTitle}>{title}</h3>}
            <button
              className={styles.iconButton}
              onClick={handleClose}
              type="button"
              aria-label="Close modal"
            >
              ✕
            </button>
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
