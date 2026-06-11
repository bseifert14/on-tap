import { ArrowRight } from "lucide-react";
import styles from "../../styles/Hero.module.css";

interface HeroProps {
  bgImageUrl: string;
  label: string;
}

export default function Hero({ bgImageUrl, label }: HeroProps) {
  return (
    <section className={styles.hero}>
      <img
        src={bgImageUrl}
        alt="Stowe, Vermont"
        className={styles.heroImg}
        fetchPriority="high"
        decoding="async"
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>Stowe, Vermont</div>
        <h1 className={styles.heroTitle}>
          What's going on
          <br/>
          <em>{label}?</em>
        </h1>
        <p className={styles.heroSubtitle}>From mountain adventures to live bands; never miss a beat around town.</p>
        <a href="#eventSection" className={styles.heroCTA}>
          Explore Events
          <ArrowRight size={20} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}