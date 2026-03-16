import React, { useMemo, useState } from "react";
import styles from "../../styles/UserEventTable.module.css";
import UserEventTableRow from "./UserEventTableRow";

export default function UserEventTable({ events, onEdit, onDelete }) {
    const [sortAsc, setSortAsc] = useState(true);

    const toggleSort = () => setSortAsc((prev) => !prev);

    const sortedEvents = useMemo(() => {
      return [...events].sort((a, b) => {
        const aDate = new Date(a.event_start_timestamp || a.event_date);
        const bDate = new Date(b.event_start_timestamp || b.event_date);
        return sortAsc ? aDate - bDate : bDate - aDate;
      });
    }, [events, sortAsc]);

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Name</th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={toggleSort}
              >
                Date & Time {sortAsc ? "↑" : "↓"}
              </th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Has Photo</th>
              <th className={styles.th}>Has Link</th>
              <th className={styles.th}>Actions</th>
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
