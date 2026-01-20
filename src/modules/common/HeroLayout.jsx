import styles from "../../styles/HeroLayout.module.css";
import StoweBirdsEye from '../../../public/images/hero/mansfield-stars.jpg';

export default function HeroLayout() {
  // return (
  //   <section className={styles.hero}>
  //     <div className={styles.left}>
  //       <img src={apresScene} alt="Apres Scene" className={styles.illustration} />
  //     </div>
  //     <div className={styles.right}>
  //       <h1 className={styles.heading}>
  //         What's going on in Stowe?
  //       </h1>
        // <p className={styles.subheading}>
        //   From mountain adventures to live bands - never miss a beat on the events going on around town.
        // </p>
        // <a href="#eventSection" className={styles.ctaButton}>
        //   Explore Events
        // </a>
  //     </div>
  //   </section>
  // );
  return (
    <section className={styles.heroContainer}>
      <img src={StoweBirdsEye} alt="Stowe Birds Eye View" className={styles.illustration} />
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
  );
}
