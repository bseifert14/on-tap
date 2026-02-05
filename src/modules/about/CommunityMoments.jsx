import styles from "../../styles/CommunityMoments.module.css";

const images = [
  "/public/images/site/frasco-apres.jpg",
  "/public/images/site/jameson-halnon-photography.jpg",
  "/public/images/site/firework-church.jpg",
  "/public/images/site/jess-yoga.jpg",
  "/public/images/site/duke-apres.jpg",
  "/public/images/site/lot-brews.jpg"
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
