import { useRef, useEffect } from "react";
import styles from "../../styles/Header.module.css";

const FITNESS_FILTERS = [
  { label: "Yoga", value: "yoga" }
]

interface MobileFiltersListProps {
  setMenuOpen: (open: boolean) => void;
  setSelectedType: (type: string) => void;
}

export default function MobileFiltersList({ setMenuOpen, setSelectedType }: MobileFiltersListProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div className={styles.mobileNavContainer}>
        {FITNESS_FILTERS.map(({ label, value }) => (
            <button onClick={() => setSelectedType(value)}>
                {label}
            </button>
        ))}
      </div>
  );
}
