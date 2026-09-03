import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/UserEventTable.module.css";
import UserEventTableRow from "./UserEventTableRow";

export default function UserEventTable({ events, onEdit, onDelete }) {
    const [sortAsc, setSortAsc] = useState(true);
    const wrapperRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleSort = () => setSortAsc((prev) => !prev);

    const sortedEvents = useMemo(() => {
      return [...events].sort((a, b) => {
        const aDate = new Date(a.event_start_timestamp || a.event_date);
        const bDate = new Date(b.event_start_timestamp || b.event_date);
        return sortAsc ? aDate - bDate : bDate - aDate;
      });
    }, [events, sortAsc]);

    useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const handleScroll = () => setIsScrolled(wrapper.scrollLeft > 0);
      wrapper.addEventListener("scroll", handleScroll, { passive: true });
      return () => wrapper.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div
        ref={wrapperRef}
        className={styles.tableWrapper}
        data-scrolled={isScrolled ? "true" : undefined}
      >
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.th} ${styles.stickyLeft}`}>Name</th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={toggleSort}
              >
                Date & Time {sortAsc ? "↑" : "↓"}
              </th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Media</th>
              <th className={`${styles.th} ${styles.actionsCell}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {sortedEvents.map((event) => (
              <UserEventTableRow
                key={event.id}
                event={event}
                onEdit={() => onEdit(event)}
                onDelete={() => onDelete(event)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
