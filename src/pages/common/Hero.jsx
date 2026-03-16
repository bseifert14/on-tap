import { ArrowRight } from "lucide-react";
import styles from "../../styles/Hero.module.css";

export default function Hero({ bgImageUrl, label }) {
  return (
    <section className={styles.hero}>
        <div className={styles.heroImg} style={{ "--hero-bg": `url("${bgImageUrl}")` }} />

        <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
                Stowe, Vermont
            </div>

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
