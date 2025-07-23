import React from "react";
import styles from "../../styles/UserEventTable.module.css";
import UserEventTableRow from "./UserEventTableRow";

export default function UserEventTable({ events, onEdit, onDelete }) {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Date & Time</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Has Photo</th>
              <th className={styles.th}>Has Link</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {events.map((event) => (
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
