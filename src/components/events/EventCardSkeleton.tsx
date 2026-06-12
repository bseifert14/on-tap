import styles from "../../styles/skeletons/EventCardSkeleton.module.css";

export default function EventCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.dateBadge} />
        <div className={styles.venuePill} />
      </div>
      <div className={styles.body}>
        <div className={styles.category} />
        <div className={styles.titleLong} />
        <div className={styles.titleShort} />
        <div className={styles.descLine} />
        <div className={styles.descLineShort} />
        <div className={styles.footer}>
          <div className={styles.meta} />
          <div className={styles.action} />
        </div>
      </div>
    </div>
  );
}