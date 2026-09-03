import { useEffect, useMemo, useState } from "react";
import { Funnel, X } from "lucide-react";

import styles from "../../styles/EventTableToolbar.module.css";
import profileStyles from "../../styles/ProfileEvents.module.css";
import SearchBar from "../../components/SearchBar";
import TableEventTypeSelector from "./TableEventTypeSelector";
import TableEventDateSelector from "./TableEventDateSelector";

export default function TableActions({
  searchValue,
  setSearchValue,
  eventTypeFilter,
  eventDateFilter,
  setEventTypeFilter,
  setEventDateFilter,
  setCurrentPage,
  showPastEvents,
  setShowPastEvents,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasActiveFilters = useMemo(() => {
    const hasType = Array.isArray(eventTypeFilter)
      ? eventTypeFilter.length > 0
      : Boolean(eventTypeFilter);
    return hasType || Boolean(eventDateFilter) || Boolean(showPastEvents);
  }, [eventTypeFilter, eventDateFilter, showPastEvents]);

  useEffect(() => {
    if (!sheetOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setEventTypeFilter([]);
    setEventDateFilter(null);
    setShowPastEvents(false);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange("")}
            placeholder="Search events..."
          />
        </div>

        <div className={styles.filterCluster}>
          <TableEventTypeSelector
            selected={eventTypeFilter}
            onApply={(next) => {
              setEventTypeFilter(next);
              setCurrentPage(1);
            }}
          />
          <TableEventDateSelector
            selected={eventDateFilter}
            onApply={(date) => {
              setEventDateFilter(date);
              setCurrentPage(1);
            }}
            onClear={() => {
              setEventDateFilter(null);
              setCurrentPage(1);
            }}
          />
          <label className={profileStyles.filterCheckbox}>
            <input
              type="checkbox"
              checked={showPastEvents}
              onChange={() => {
                setShowPastEvents((prev) => !prev);
                setCurrentPage(1);
              }}
            />
            <span>Show Past Events</span>
          </label>
        </div>

        <div className={styles.mobileFilterWrap}>
          <button
            type="button"
            className={styles.filterIconBtn}
            onClick={() => setSheetOpen(true)}
            aria-label="Open filters"
          >
            <Funnel size={18} strokeWidth={1.5} />
          </button>
          {hasActiveFilters && <span className={styles.filterBadge} />}
        </div>
      </div>

      {sheetOpen && (
        <>
          <div
            className={styles.sheetBackdrop}
            onClick={() => setSheetOpen(false)}
          />
          <div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className={styles.sheetHeader}>
              <h2 className={styles.sheetTitle}>Filters</h2>
              <button
                type="button"
                className={styles.sheetClose}
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className={styles.sheetBody}>
              <TableEventTypeSelector
                selected={eventTypeFilter}
                onApply={(next) => {
                  setEventTypeFilter(next);
                  setCurrentPage(1);
                }}
              />
              <TableEventDateSelector
                selected={eventDateFilter}
                onApply={(date) => {
                  setEventDateFilter(date);
                  setCurrentPage(1);
                }}
                onClear={() => {
                  setEventDateFilter(null);
                  setCurrentPage(1);
                }}
              />
              <label className={profileStyles.filterCheckbox}>
                <input
                  type="checkbox"
                  checked={showPastEvents}
                  onChange={() => {
                    setShowPastEvents((prev) => !prev);
                    setCurrentPage(1);
                  }}
                />
                <span>Show Past Events</span>
              </label>
            </div>

            <div className={styles.sheetFooter}>
              <button
                type="button"
                className={styles.sheetClear}
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
              >
                Clear all
              </button>
              <button
                type="button"
                className={styles.sheetApply}
                onClick={() => setSheetOpen(false)}
              >
                Show results
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
