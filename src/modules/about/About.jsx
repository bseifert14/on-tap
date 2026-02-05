import AboutHeroSection from './AboutHeroSection';
import CommunityMoments from './CommunityMoments';
import CTASection from './CTASection';
import styles from "../../styles/About.module.css";

export default function About() {
  return (
    <section className={styles.wrapper}>
      <AboutHeroSection />
      <CommunityMoments />
      <CTASection />
    </section>
  );
}
