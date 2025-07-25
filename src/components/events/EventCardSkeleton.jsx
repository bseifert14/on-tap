import React from "react";
import styles from "../../styles/EventCard.module.css";
import skeleton from "../../styles/skeletons/EventCardSkeleton.module.css";

export default function EventCardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${styles.card} ${skeleton.skeletonCard}`}>
          <div className={`${styles.image} ${skeleton.shimmer}`} />

          <div className={styles.content}>
            <div className={`${styles.categoryContainer} ${skeleton.shimmer}`} style={{ width: "100px", height: "24px" }} />
            <div className={`${styles.title} ${skeleton.shimmer}`} style={{ width: "60%", height: "24px" }} />
            <div className={`${styles.description} ${skeleton.shimmer}`} style={{ width: "90%", height: "18px" }} />
            <div className={styles.details}>
              <div className={`${styles.iconValuePair} ${skeleton.shimmer}`} style={{ width: "40%", height: "16px" }} />
              <div className={`${styles.iconValuePair} ${skeleton.shimmer}`} style={{ width: "40%", height: "16px" }} />
            </div>
          </div>

          <div className={styles.buttons}>
            <div className={`${skeleton.shimmer}`} style={{ height: "36px", borderRadius: "9999px", width: "100px" }} />
          </div>
        </div>
      ))}
    </>
  );
}
