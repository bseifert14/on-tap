import tableStyles from "../styles/UserEventTable.module.css";
import rowStyles from "../styles/UserEventTableRow.module.css";
import styles from "../styles/skeletons/TableSkeleton.module.css";

interface TableSkeletonProps {
  rows?: number;
}

const nameBarWidths = ["70%", "55%", "80%", "45%", "65%"];
const descBarWidths = ["90%", "70%", "55%", "85%", "75%"];

export default function TableSkeleton({ rows = 5 }: TableSkeletonProps) {
  return (
    <div className={tableStyles.tableWrapper}>
      <table className={tableStyles.table}>
        <thead className={tableStyles.thead}>
          <tr>
            <th className={`${tableStyles.th} ${tableStyles.stickyLeft}`}>
              <div className={styles.headerBar} style={{ width: 50 }} />
            </th>
            <th className={tableStyles.th}>
              <div className={styles.headerBar} style={{ width: 90 }} />
            </th>
            <th className={tableStyles.th}>
              <div className={styles.headerBar} style={{ width: 80 }} />
            </th>
            <th className={tableStyles.th}>
              <div className={styles.headerBar} style={{ width: 50 }} />
            </th>
            <th className={`${tableStyles.th} ${tableStyles.actionsCell}`}>
              <div
                className={styles.headerBar}
                style={{ width: 60, marginLeft: "auto" }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td
                className={`${rowStyles.cell} ${rowStyles.eventNameCell} ${rowStyles.stickyLeft}`}
              >
                <div
                  className={styles.bar}
                  style={{ width: nameBarWidths[i % nameBarWidths.length] }}
                />
              </td>
              <td className={rowStyles.cell}>
                <div className={styles.bar} style={{ width: 180 }} />
              </td>
              <td className={`${rowStyles.cell} ${rowStyles.truncate}`}>
                <div
                  className={styles.bar}
                  style={{ width: descBarWidths[i % descBarWidths.length] }}
                />
              </td>
              <td className={rowStyles.cell}>
                <div className={rowStyles.mediaCell}>
                  <div className={styles.iconBar} />
                  <div className={styles.iconBar} />
                </div>
              </td>
              <td className={`${rowStyles.cell} ${rowStyles.actionsCell}`}>
                <div className={rowStyles.actionButtonContainer}>
                  <div className={styles.actionBar} />
                  <div className={styles.actionBar} />
                </div>
                <div className={rowStyles.actionMenu}>
                  <div className={styles.actionBar} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
