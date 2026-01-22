import { Link } from 'react-router-dom';

import styles from '../../styles/About.module.css';
import CHURCH from '../../../public/images/site/church.jpg';
import POND_SKIM from '../../../public/images/site/jameson-halnon-photography.jpg';

export default function About() {
  return (
    <div>
      <section className={styles.aboutHero}>
        <img src={CHURCH} alt="Stowe Church" className={styles.illustration} />
        <div className={styles.aboutHeroTextContainer}>
          <p className={styles.aboutHeroText}>Your Guide to the Heart of Stowe</p>
        </div>
        <div className={styles.aboutHeroSubTextContainer}>
          <p className={styles.aboutHeroSubText}>
              Connecting you with authentic local experiences and community-driven events.
          </p>
        </div>
      </section>
      <section className={styles.visionSectionContainer}>
        <h1>Our Vision</h1>
        <p><em>Our goal is simple</em>: To help the community stay connected with everything going on around town.</p>
        <p>As locals, we've missed out on events just because we didn’t know they were happening. So we built something we wished already existed - a central space where businesses and individuals can easily share what they have going on, and where the community can quickly find it all in one place. No more missing the good stuff.</p>
      </section>
      <div className={styles.photoContainer}>
        <img src={POND_SKIM} alt="Stowe Mountain Pond Skim Photo By Jameson Halnon" className={styles.photo} />
      </div>
      <section className={styles.visionSectionContainer}>
        <p>Whether you're a local, a visitor, or somewhere in between, On Tap has you covered with up-to-date event details.</p>
      </section>
      <section className={styles.ctaSectionContainer}>
        <h1>Want to list your event?</h1>
        <Link to="/contact" className={styles.ctaButton}>Get started here</Link>
      </section>
    </div>
  );
}
