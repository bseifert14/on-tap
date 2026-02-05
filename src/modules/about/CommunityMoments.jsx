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
      <div className={styles.header}>
        <h2 className={styles.title}>Community Moments</h2>
        <p className={styles.subtitle}>
          A visual journey through the seasons and celebrations of Stowe.
        </p>
      </div>

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
