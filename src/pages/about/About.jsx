import AboutHeroSection from './AboutHeroSection';
import CommunityMoments from './CommunityMoments';
import CTASection from './CTASection';
import styles from "../../styles/About.module.css";
import AboutBodySection from './AboutBodySection';

export default function About() {
  return (
    // <section className={styles.wrapper}>
    <section>
      <AboutHeroSection />
      <AboutBodySection />
      <CommunityMoments />
      <CTASection />
    </section>
  );
}
