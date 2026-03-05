import { PhotoRef } from "../../constants/photoRef";
import styles from "../../styles/CommunityMoments.module.css";

const images = [
  PhotoRef.FrascoApres,
  PhotoRef.JamesonHalnonPhotography,
  PhotoRef.FireworkChurch,
  PhotoRef.JessYoga,
  PhotoRef.DukeApres,
  PhotoRef.LotBrews
];

export default function CommunityMoments() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionEyebrow}>Community</div>
      <div className={styles.sectionTitle}>Moments from <br/> <em>around town</em></div>
      <p className={styles.subtitle}>
        Want to be featured here? Get in touch below with a photo from your favorite event.
      </p>

      <div className={styles.grid}>
        {images.map((src, i) => (
          <div
            key={i}
            className={styles.tile}
            style={{ "--bg": `url(${src})` }}
          />
        ))}
      </div>
    </section>
  );
}
