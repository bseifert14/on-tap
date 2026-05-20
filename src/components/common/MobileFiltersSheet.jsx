import { useState, useMemo } from "react";
import { EVENT_TYPE_FILTERS, FILTER_TO_TYPES, EVENT_TYPES } from "../../constants/eventTypes";
import styles from "../../styles/MobileFiltersSheet.module.css";

const TIME_OF_DAY = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
];

function getCategoryForType(type) {
  for (const [cat, types] of Object.entries(FILTER_TO_TYPES)) {
    if (types.includes(type) && type !== cat) return cat;
  }
  return null;
}

function initCategory(selectedType) {
  if (!selectedType || selectedType === "all") return "all";
  if (FILTER_TO_TYPES[selectedType]) return selectedType;
  return getCategoryForType(selectedType) ?? "all";
}

function initSubType(selectedType) {
  if (!selectedType || selectedType === "all") return null;
  if (FILTER_TO_TYPES[selectedType]) return null;
  return selectedType;
}

export default function MobileFiltersSheet({ selectedType, selectedTimeOfDay, onApply, onClose }) {
  const [draftCategory, setDraftCategory] = useState(() => initCategory(selectedType));
  const [draftSubType, setDraftSubType] = useState(() => initSubType(selectedType));
  const [draftTimeOfDay, setDraftTimeOfDay] = useState(selectedTimeOfDay ?? null);

  const subTypes = useMemo(() => {
    if (!draftCategory || draftCategory === "all") return [];
    return (FILTER_TO_TYPES[draftCategory] ?? [])
      .filter(slug => slug !== draftCategory)
      .map(slug => EVENT_TYPES[slug])
      .filter(Boolean);
  }, [draftCategory]);

  const handleCategorySelect = (value) => {
    setDraftCategory(value);
    setDraftSubType(null);
  };

  const handleSubTypeSelect = (value) => {
    setDraftSubType(prev => prev === value ? null : value);
  };

  const handleTimeOfDaySelect = (value) => {
    setDraftTimeOfDay(prev => prev === value ? null : value);
  };

  const handleApply = () => {
    const type = draftSubType ?? draftCategory;
    onApply(type, draftTimeOfDay);
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollable}>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Category</p>
          <div className={styles.chips}>
            {EVENT_TYPE_FILTERS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`${styles.chip} ${draftCategory === value ? styles.chipActive : ""}`}
                onClick={() => handleCategorySelect(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {subTypes.length > 0 && (
          <>
            <div className={styles.divider} />
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Type</p>
              <div className={styles.chips}>
                {subTypes.map(({ label, slug }) => (
                  <button
                    key={slug}
                    type="button"
                    className={`${styles.chip} ${draftSubType === slug ? styles.chipActive : ""}`}
                    onClick={() => handleSubTypeSelect(slug)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className={styles.divider} />

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Time of day</p>
          <div className={styles.chips}>
            {TIME_OF_DAY.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`${styles.chip} ${draftTimeOfDay === value ? styles.chipActive : ""}`}
                onClick={() => handleTimeOfDaySelect(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.applyButton} onClick={handleApply}>
          Show results
        </button>
      </div>
    </div>
  );
}
