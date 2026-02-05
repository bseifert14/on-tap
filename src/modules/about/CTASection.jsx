import { Link } from "react-router-dom";
import styles from "../../styles/CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Want to list your event?</h2>
        <p className={styles.subtitle}>Join our community of organizers and creators. Share your event with thousands of residents and visitors.</p>
        <Link to="/contact" className={styles.button}>Get started here</Link>
      </div>
    </section>
  );
}
