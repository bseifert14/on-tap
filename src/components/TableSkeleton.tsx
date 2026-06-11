import styles from '../styles/skeletons/TableSkeleton.module.css';

export default function TableSkeleton({ rows = 5 }) {
    return (
      <div className={styles.skeletonWrapper}>
        <div className={styles.tableSkeletonResponsive}>
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className={styles.skeletonRow}>
              {Array.from({ length: 7 }).map((__, colIdx) => (
                <div key={colIdx} className={styles.skeletonCell}>
                  <div className={styles.skeletonBox}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
