import { useRef, useState } from "react";
import useDrawerState from "./useDrawerState";
import styles from "../../styles/BottomSheet.module.css";

export default function BottomSheet({
  isOpen,
  onClose,
  id,
  height = "70vh",
  children,
}) {
  const sheetRef = useRef(null);
  const dragStartY = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { mounted, visible, handleTransitionEnd } = useDrawerState({
    isOpen,
    onClose,
  });

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    setDragOffset(Math.max(0, delta));
  };

  const handleTouchEnd = () => {
    const sheetHeight = sheetRef.current?.offsetHeight ?? 0;
    const threshold = sheetHeight * 0.35;
    const shouldClose = dragOffset > threshold;

    setDragOffset(0);
    setIsDragging(false);
    dragStartY.current = null;

    if (shouldClose) onClose?.();
  };

  if (!mounted) return null;

  const dragStyle = isDragging
    ? { transform: `translateY(${dragOffset}px)`, transition: "none" }
    : undefined;

  return (
    <>
      <div
        className={`${styles.backdrop} ${visible ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${visible ? styles.sheetOpen : ""}`}
        style={{ height, ...dragStyle }}
        onTransitionEnd={handleTransitionEnd}
        role="dialog"
        aria-modal="false"
        aria-label={id}
      >
        <div
          className={styles.handleArea}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.handle} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
