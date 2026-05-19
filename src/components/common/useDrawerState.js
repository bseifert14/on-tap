import { useState, useEffect } from "react";

export default function useDrawerState({ isOpen, onClose, focusRef }) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      setVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handleKeyDown);
    if (isOpen && focusRef?.current) {
      requestAnimationFrame(() => focusRef.current?.focus());
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, isOpen, onClose, focusRef]);

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (!visible) setMounted(false);
  };

  return { mounted, visible, handleTransitionEnd };
}
