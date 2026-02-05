import { Heart, Map, MountainSnow } from "lucide-react";
import styles from "../../styles/AboutHeroSection.module.css";

export default function AboutHeroSection() {
  return (
    <>
      <div
        className={styles.hero}
        style={{ "--hero-bg": "url(/public/images/hero/mansfield-sunset.jpg)" }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Your Guide to the  <br />
            Heart of Stowe
          </h1>

          <p className={styles.subtitle}>
            Curating the finest local gatherings, mountain traditions, and hidden
            gems in the village of Stowe, Vermont.
          </p>
        </div>
      </div>
      <div className={styles.values}>
        <div className={styles.value}>
            <MountainSnow />
    
          <h3>Community Vision</h3>
          <p>
            On Tap Stowe was born from a simple desire: to unify the vibrant
            energy of our mountain town. We bridge the gap between historic
            traditions and modern culture.
          </p>
        </div>

        <div className={styles.value}>
            <Heart />
          <h3>Local Spirit</h3>
          <p>
            Authenticity is our compass. From local brewery pop-ups to seasonal
            farm-to-table dinners and the legendary Stowe pond skimming, we
            celebrate the makers and dreamers.
          </p>
        </div>

        <div className={styles.value}>
            <Map />
          <h3>The Guide</h3>
          <p>
            More than a calendar, we’re a curated editorial guide. We provide
            context, stories, and insight into what’s happening — and why it
            matters.
          </p>
        </div>
      </div>
    </>
  );
}
