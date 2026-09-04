import { useEffect, useMemo, useState } from "react";
import { Funnel } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "../../styles/EventTableToolbar.module.css";
import profileStyles from "../../styles/ProfileEvents.module.css";
import SearchBar from "../../components/SearchBar";
import BottomSheet from "../../components/common/BottomSheet";
import TableEventTypeSelector from "./TableEventTypeSelector";
import TableEventDateSelector from "./TableEventDateSelector";
import { EVENT_TYPE_FILTERS } from "../../constants/eventTypes";

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
  const [draftTypes, setDraftTypes] = useState(() =>
    Array.isArray(eventTypeFilter) ? eventTypeFilter : []
  );
  const [draftDate, setDraftDate] = useState(() =>
    eventDateFilter ? new Date(eventDateFilter) : null
  );
  const [draftPastEvents, setDraftPastEvents] = useState(showPastEvents);

  const hasActiveFilters = useMemo(() => {
    const hasType = Array.isArray(eventTypeFilter)
      ? eventTypeFilter.length > 0
      : Boolean(eventTypeFilter);
    return hasType || Boolean(eventDateFilter) || Boolean(showPastEvents);
  }, [eventTypeFilter, eventDateFilter, showPastEvents]);

  const hasDraftFilters = useMemo(() => {
    return draftTypes.length > 0 || Boolean(draftDate) || Boolean(draftPastEvents);
  }, [draftTypes, draftDate, draftPastEvents]);

  useEffect(() => {
    if (!sheetOpen) return;
    setDraftTypes(Array.isArray(eventTypeFilter) ? eventTypeFilter : []);
    setDraftDate(eventDateFilter ? new Date(eventDateFilter) : null);
    setDraftPastEvents(showPastEvents);
  }, [sheetOpen, eventTypeFilter, eventDateFilter, showPastEvents]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const toggleDraftType = (value) => {
    setDraftTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const clearDrafts = () => {
    setDraftTypes([]);
    setDraftDate(null);
    setDraftPastEvents(false);
  };

  const applyDrafts = () => {
    setEventTypeFilter(draftTypes);
    setEventDateFilter(draftDate ? draftDate.toISOString().split("T")[0] : null);
    setShowPastEvents(draftPastEvents);
    setCurrentPage(1);
    setSheetOpen(false);
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

      <BottomSheet
        id="event-filters-sheet"
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        height="80vh"
      >
        <div className={styles.sheetContent}>
          <div className={styles.sheetBody}>
            <div className={styles.sheetSection}>
              <p className={styles.sheetSectionLabel}>Event Type</p>
              <div className={styles.pillGroup}>
                {EVENT_TYPE_FILTERS.filter(({ value }) => value !== "all").map(
                  ({ label, value }) => {
                    const active = draftTypes.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.pill} ${active ? styles.pillActive : ""}`}
                        onClick={() => toggleDraftType(value)}
                      >
                        {label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className={styles.sheetSection}>
              <p className={styles.sheetSectionLabel}>Date</p>
              <div className={styles.datePickerWrap}>
                <DatePicker
                  selected={draftDate}
                  onChange={(date) => setDraftDate(date)}
                  inline
                />
                {draftDate && (
                  <button
                    type="button"
                    className={styles.clearDateButton}
                    onClick={() => setDraftDate(null)}
                  >
                    Clear date
                  </button>
                )}
              </div>
            </div>

            <label className={profileStyles.filterCheckbox}>
              <input
                type="checkbox"
                checked={draftPastEvents}
                onChange={() => setDraftPastEvents((prev) => !prev)}
              />
              <span>Show Past Events</span>
            </label>
          </div>

          <div className={styles.sheetFooter}>
            <button
              type="button"
              className={styles.sheetClear}
              onClick={clearDrafts}
              disabled={!hasDraftFilters}
            >
              Clear all
            </button>
            <button
              type="button"
              className={styles.sheetApply}
              onClick={applyDrafts}
            >
              Show results
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
