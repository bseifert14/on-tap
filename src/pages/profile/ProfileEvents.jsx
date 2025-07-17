import { useEffect, useState } from "react";
import styles from "../../styles/revamp/ProfileEvents.module.css";
import { supabase } from "../../supabase";
import AddEditEventModal from "../../components/AddEditEventModal";
import DeleteModal from "../../components/DeleteModal";
import UserEventTable from "../../modules/profile/UserEventTable";
import TableEventTypeSelector from "../../modules/profile/TableEventTypeSelector";
import TableEventDateSelector from "../../modules/profile/TableEventDateSelector";

export default function ProfileEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState([]);
  const [eventDateFilter, setEventDateFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 10;

  useEffect(() => {
    if (user) loadEvents();
  }, [user]);

  const loadEvents = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", user.id);
    if (!error && data) setEvents(data);
  };

  const handleSaveEvent = () => {
    setShowModal(false);
    setEditingEvent(null);
    loadEvents();
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    await supabase.from("events").delete().eq("id", eventToDelete.id);
    setEventToDelete(null);
    loadEvents();
  };

  const filtered = events
    .filter(e =>
      e.event_name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(e =>
      eventTypeFilter.length === 0 || eventTypeFilter.includes(e.event_type)
    )
    .filter(e =>
      !eventDateFilter || e.event_date === eventDateFilter
    );

  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  return (
    <div>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.leftGroup}>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addButton}
          >
            + Add Event
          </button>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
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
                  {/* Date Dropdown */}
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

        </div>
      </div>

      {/* Table */}
      <UserEventTable
        events={paginated}
        onEdit={(event) => {
          setEditingEvent(event);
          setShowModal(true);
        }}
        onDelete={(event) => setEventToDelete(event)}
      />

      {/* Pagination */}
      <div className={styles.paginationFooter}>
        <div>
          Showing {Math.min(EVENTS_PER_PAGE, filtered.length)} of {filtered.length} Events
        </div>
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i + 1 === currentPage ? styles.activePage : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <AddEditEventModal
          user={user}
          event={editingEvent}
          onClose={() => {
            setShowModal(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}

      {eventToDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setEventToDelete(null)}
        />
      )}
    </div>
  );
}
