import styles from "../../styles/HeroLayout.module.css";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export default function HeroLayout({ currentView }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const heroText = currentView === "list" ? "What's going on tonight in Stowe?" : "What's going on this month in Stowe?";
  const heroImageClass = `${styles.heroContainer} ${isMobile ? styles.mansfieldStars : styles.stowePanorama}`;

  return (
    <section className={heroImageClass}>
      <div className={styles.heroTextContainer}>
        <p className={styles.heroText}>{heroText}</p>
        <p className={styles.subheading}>
          From mountain adventures to live bands - never miss a beat around town.
        </p>
        <a href="#eventSection" className={styles.ctaButton}>
          Explore Events
        </a>
      </div>
    </section>
  );
}
