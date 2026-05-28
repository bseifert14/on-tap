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
  const first = Array.isArray(selectedType) ? selectedType[0] : selectedType;
  if (!first || first === "all") return "all";
  if (FILTER_TO_TYPES[first]) return first;
  return getCategoryForType(first) ?? "all";
}

function initSubTypes(selectedType) {
  if (!selectedType) return [];
  const types = Array.isArray(selectedType) ? selectedType : [selectedType];
  return types.filter(t => t && t !== "all" && !FILTER_TO_TYPES[t]);
}

function toggleItem(arr, value) {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
}

export default function MobileFiltersSheet({ selectedType, selectedTimeOfDay, onApply, onClose }) {
  const [draftCategory, setDraftCategory] = useState(() => initCategory(selectedType));
  const [draftSubTypes, setDraftSubTypes] = useState(() => initSubTypes(selectedType));
  const [draftTimesOfDay, setDraftTimesOfDay] = useState(() =>
    Array.isArray(selectedTimeOfDay) ? selectedTimeOfDay : selectedTimeOfDay ? [selectedTimeOfDay] : []
  );

  const subTypes = useMemo(() => {
    if (!draftCategory || draftCategory === "all") return [];
    return (FILTER_TO_TYPES[draftCategory] ?? [])
      .filter(slug => slug !== draftCategory)
      .map(slug => EVENT_TYPES[slug])
      .filter(Boolean)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [draftCategory]);

  const handleCategorySelect = (value) => {
    setDraftCategory(value);
    setDraftSubTypes([]);
  };

  const handleSubTypeSelect = (value) => {
    setDraftSubTypes(prev => toggleItem(prev, value));
  };

  const handleTimeOfDaySelect = (value) => {
    setDraftTimesOfDay(prev => toggleItem(prev, value));
  };

  const handleApply = () => {
    const type = draftSubTypes.length ? draftSubTypes : draftCategory;
    onApply(type, draftTimesOfDay);
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
                    className={`${styles.chip} ${draftSubTypes.includes(slug) ? styles.chipActive : ""}`}
                    onClick={() => handleSubTypeSelect(slug)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* <div className={styles.divider} />

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Time of day</p>
          <div className={styles.chips}>
            {TIME_OF_DAY.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`${styles.chip} ${draftTimesOfDay.includes(value) ? styles.chipActive : ""}`}
                onClick={() => handleTimeOfDaySelect(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div> */}

      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.applyButton} onClick={handleApply}>
          Show results
        </button>
      </div>
    </div>
  );
}
