import { useRef } from "react";
import useDrawerState from "./useDrawerState";
import styles from "../../styles/Drawer.module.css";

export default function Drawer({
  isOpen,
  onClose,
  id,
  title,
  width = "70%",
  maxWidth = "360px",
  children,
}) {
  const closeBtnRef = useRef(null);
  const { mounted, visible, handleTransitionEnd } = useDrawerState({
    isOpen,
    onClose,
    focusRef: closeBtnRef,
  });

  if (!mounted) return null;

  return (
    <>
      <div
        className={`${styles.backdrop} ${visible ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />
      <aside
        className={`${styles.drawer} ${visible ? styles.drawerOpen : ""}`}
        style={{ width, maxWidth }}
        onTransitionEnd={handleTransitionEnd}
        role="dialog"
        aria-modal="false"
        aria-label={title || id}
      >
        {title && (
          <header className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button
              ref={closeBtnRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </aside>
    </>
  );
}
