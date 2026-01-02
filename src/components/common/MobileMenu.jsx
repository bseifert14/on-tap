import { useEffect, useRef, useState } from "react";
import styles from "../../styles/MobileMenu.module.css";

export default function MobileMenu({
  isOpen,
  onClose,
  id,
  title = "Menu",
  width = "70%",
  maxWidth = "360px",
  children
}) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const closeBtnRef = useRef(null);

  // Mount when opening so we can animate in
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  // When mounted, flip "visible" on next frame so open animates
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      // ensure we start closed, then open on next
      setVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [isOpen, mounted]);

  // ESC to close + focus close button when opened
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, isOpen, onClose]);

  // After closing animation completes, unmount
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    // When closing finishes, unmount
    if (!visible) setMounted(false);
  };

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
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            ref={closeBtnRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            ✕
          </button>
        </header>

        <div className={styles.content}>{children}</div>
      </aside>
    </>
  );
}
