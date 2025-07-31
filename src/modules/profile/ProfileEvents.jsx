import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from 'sonner';

import styles from "../../styles/ProfileEvents.module.css";

import AddEditEventModal from "../../components/AddEditEventModal";
import DeleteModal from "../../components/DeleteModal";
import UserEventTable from "./UserEventTable";
import TableActions from "./TableActions";
import Banner from "../../components/common/Banner";
import useClientEvents from "../../utils/hooks/useClientEvents";
import useClientData from "../../utils/hooks/useClientData";
import useClientEventsModal from "../../utils/hooks/useClientEventsModal";
import { useBusinessProfile } from "../../utils/hooks/useBusinessProfile";
import TableSkeleton from "../../components/TableSkeleton";

export default function ProfileEvents({ user }) {
  const {
    business,
    events,
    total,
    currentPage,
    totalPages,
    setCurrentPage,
    search,
    setSearch,
    eventTypeFilter,
    setEventTypeFilter,
    eventDateFilter,
    setEventDateFilter,
    showPastEvents,
    setShowPastEvents,
    loadEvents,
    isLoading
  } = useClientData(user?.id);

  const {
    editingEvent,
    setEditingEvent,
    showModal,
    setShowModal,
    eventToDelete,
    setEventToDelete,
    handleSaveEvent,
    handleDelete
  } = useClientEventsModal(loadEvents);

  if (isLoading) {
    return <TableSkeleton />
  }

  if (!business?.url) {
    return <Banner message="Please complete your business profile before adding events." />
  }

  return (
    <div>
      {/* Top Bar */}
      <TableActions
        setShowModal={setShowModal}
        searchValue={search}
        setSearchValue={setSearch}
        eventTypeFilter={eventTypeFilter}
        eventDateFilter={eventDateFilter}
        setEventTypeFilter={setEventTypeFilter}
        setEventDateFilter={setEventDateFilter}
        setCurrentPage={setCurrentPage}
        showPastEvents={showPastEvents}
        setShowPastEvents={setShowPastEvents}
      />

      {/* Table */}
      <UserEventTable
        events={events}
        onEdit={(event) => {
          setEditingEvent(event);
          setShowModal(true);
        }}
        onDelete={setEventToDelete}
      />

      {/* Pagination */}
      <div className={styles.paginationFooter}>
        <div>
          Showing {Math.min(events.length, 10)} of {total} Events
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
