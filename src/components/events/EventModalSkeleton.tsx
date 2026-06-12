import Modal from "../common/Modal";
import styles from "../../styles/skeletons/EventModalSkeleton.module.css";

interface EventModalSkeletonProps {
  onClose: () => void;
}

export default function EventModalSkeleton({ onClose }: EventModalSkeletonProps) {
  const Hero = () => (
    <div className={styles.heroSkeleton}>
      <div className={styles.dateBadge} />
      <div className={styles.category} />
    </div>
  );

  const Footer = () => (
    <div className={styles.footer}>
      <div className={styles.footerBtn} />
      <div className={styles.footerShare} />
    </div>
  );

  return (
    <Modal onClose={onClose} hero={<Hero />} footer={<Footer />}>
      <div className={styles.title} />
      <div className={styles.titleShort} />

      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <div className={styles.metaIcon} />
          <div className={styles.metaLines}>
            <div className={styles.metaLabel} />
            <div className={styles.metaValue} />
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaIcon} />
          <div className={styles.metaLines}>
            <div className={styles.metaLabel} />
            <div className={styles.metaValue} />
          </div>
        </div>
      </div>

      <div className={styles.descLabel} />
      <div className={styles.descLine} />
      <div className={styles.descLine} />
      <div className={styles.descLineMid} />
      <div className={styles.descLine} />
      <div className={styles.descLineShort} />
    </Modal>
  );
}