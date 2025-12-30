import styles from "../../styles/HeroLayout.module.css";
import apresScene from '../../../public/images/hero/apres-scene.png';

export default function HeroLayout({ currentView }) {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <img src={apresScene} alt="Apres Scene" className={styles.illustration} />
      </div>
      <div className={styles.right}>
        <h1 className={styles.heading}>
          What's going on in Stowe?
        </h1>
        <p className={styles.subheading}>
          From mountain adventures to live bands - never miss a beat on the events going on around town.
        </p>
        <a href="#eventSection" className={styles.ctaButton}>
          Explore Events
        </a>
      </div>
    </section>
  );
}
