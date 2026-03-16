import styles from "../../styles/AboutHeroSection.module.css";
import { PhotoRef } from "../../constants/photoRef";

export default function AboutHeroSection() {
  return (
    <div className={styles.heroUpdated}>
      <div className={styles.heroImg} style={{ "--hero-bg": `url("${PhotoRef.MansfieldSnow}")` }} />
      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>About Us</div>
        <h1 className={styles.heroTitle}>Your Inside Guide to Stowe</h1>
      </div>
    </div>
  )
}
