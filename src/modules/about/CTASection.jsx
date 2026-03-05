import { Link } from "react-router-dom";
import styles from "../../styles/CTASection.module.css";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    // <section className={styles.section}>
    //   <div className={styles.card}>
    //     <h2 className={styles.title}>Want to list your event?</h2>
    //     <p className={styles.subtitle}>Join our community of organizers and creators. Share your event with thousands of residents and visitors.</p>
    //     <Link to="/contact" className={styles.button}>Get started here</Link>
    //   </div>
    // </section>
    <section className={styles.section}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaEyebrow}>For Organizers</div>
        <div className={styles.ctaTitle}>Want to list your event?</div>
        <div className={styles.ctaBody}>Join our community of organizers and creators. Share your event with thousands of residents and visitors.</div>
        <Link to="/contact" className={styles.ctaButton}>
          Get started here
          <ArrowRight size={20} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
