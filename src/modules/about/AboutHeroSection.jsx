import { Heart, Map, MountainSnow } from "lucide-react";
import styles from "../../styles/AboutHeroSection.module.css";
import { PhotoRef } from "../../constants/photoRef";

export default function AboutHeroSection() {
  return (
    <>
      <div
        className={styles.hero}
        style={{ "--hero-bg": `url(${PhotoRef.MansfieldSunset})` }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Your Inside Guide to Stowe
          </h1>

          {/* <p className={styles.subtitle}>
            Curating the finest local gatherings, mountain traditions, and hidden
            gems in the village of Stowe, Vermont.
          </p> */}
        </div>
      </div>
      <div className={styles.values}>
        <div className={styles.value}>
            <MountainSnow />
    
          <h3>Community Vision</h3>
          <p>
            On Tap Stowe was born with a simple goal in mind: to help the community 
            stay connected with everything going on around town - whether it's a 
            familiar local favorite or something new happening this weekend. No more 
            missing the good stuff.
          </p>
        </div>

        <div className={styles.value}>
            <Heart />
          <h3>Local Spirit</h3>
          <p>
            Our community thrives when we come together. Knowing what's happening 
            around town helps all of us show up, support local businesses, see great 
            live music, and be part of the community.
          </p>
        </div>

        <div className={styles.value}>
            <Map />
          <h3>The Guide</h3>
          <p>
            We bring events together in one easy place, so you always know what's on 
            tap around town. Whether you're a local, a visitor, or somewhere in between, 
            On Tap Stowe keeps you up to date with what's happening.
          </p>
        </div>
      </div>
    </>
  );
}
