import styles from "../../styles/ProfileEvents.module.css";
import TableEventTypeSelector from "./TableEventTypeSelector";
import TableEventDateSelector from "./TableEventDateSelector";
import Button from "../../components/common/Button";

export default function TableActions({
  user,
  setShowModal,
  searchValue,
  setSearchValue,
  eventTypeFilter,
  eventDateFilter,
  setEventTypeFilter,
  setEventDateFilter,
  setCurrentPage,
  showPastEvents,
  setShowPastEvents
}) {
  return (
    <div>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.leftGroup}>
          <Button
            onClick={() => setShowModal(true)}
            className={styles.addButton}
          >
            + Add Event
          </Button>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search events..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className={styles.rightFilters}>
          <TableEventTypeSelector
            selected={eventTypeFilter}
            onApply={(newSel) => {
              setEventTypeFilter(newSel);
              setCurrentPage(1);
            }}
          />

          <div className={styles.filterWrapper}>
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
          </div>

          <label className={styles.filterCheckbox}>
            <input
              type="checkbox"
              checked={showPastEvents}
              onChange={() => {
                setShowPastEvents(prev => !prev);
                setCurrentPage(1);
              }}
            />
            <span>Show Past Events</span>
          </label>
        </div>
      </div>
    </div>
  );
}
