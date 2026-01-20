import styles from "../../styles/HeroLayout.module.css";
import MansfieldStars from '../../../public/images/hero/mansfield-stars.jpg';
import StowePanorama from '../../../public/images/hero/jeffrey-clayton-stowe.jpg';
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export default function HeroLayout() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    !isMobile ? (
      <section className={styles.heroContainer}>
        <img src={StowePanorama} alt="Photo by Jeffrey Clayton on Unsplash" className={styles.illustration} />
        <div className={styles.heroTextContainer}>
          <p className={styles.heroText}>What's going on tonight in Stowe?</p>
          <p className={styles.subheading}>
            From mountain adventures to live bands - never miss a beat around town.
          </p>
          <a href="#eventSection" className={styles.ctaButton}>
            Explore Events
          </a>
        </div>
      </section>
    ) : (
      <section className={styles.heroContainer}>
        <img src={MansfieldStars} alt="Mount Mansfield Stowe Astrophotography" className={styles.illustration} />
        <div className={styles.heroTextContainer}>
          <p className={styles.heroText}>What's going on tonight in Stowe?</p>
          <p className={styles.subheading}>
            From mountain adventures to live bands - never miss a beat around town.
          </p>
          <a href="#eventSection" className={styles.ctaButton}>
            Explore Events
          </a>
        </div>
      </section>
    )
  );
}
