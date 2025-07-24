import { Link } from 'react-router-dom';

import styles from '../../styles/About.module.css';
import G_LOVE from '../../../public/images/defaults/music.jpg';
import CHURCH from '../../../public/images/site/church.jpg';
import BIKING from '../../../public/images/defaults/sports.jpg';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.section}>
        <img src={G_LOVE} alt="G Love in Stowe" className={styles.image} />
        <div className={styles.text}>
          <h2>ON TAP STOWE</h2>
          <p><em>On Tap Stowe</em> is your go-to hub for discovering events in the local community.</p>
          <p>Whether you're looking for something to do tonight, planning your weekend, or just trying to get out of the house, this site makes it easy to find what's happening — from live music and festivals to tastings, trivia nights, and everything in between.</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.text}>
          <h2>OUR VISION</h2>
          <p><em>Our goal is simple</em>: To help the community stay connected with everything going on around town.</p>
          <p>As locals, we've missed out on events just because we didn’t know they were happening. So we built something we wished already existed: a central space where businesses and individuals can easily share what they have going on, and where the community can quickly find it all in one place. No more missing the good stuff.</p>
        </div>
        <img src={CHURCH} alt="Stowe Church" className={styles.image} />
      </div>

      <div className={styles.section}>
        <img src={BIKING} alt="Mountain Biking Stowe" className={styles.image} />
        <div className={styles.textBlock}>
            <p className={styles.mainText}>
                Whether you're a local, a visitor, or somewhere in between, On Tap has you covered with up-to-date event details.
            </p>

            <div className={styles.ctaWrapper}>
                <p className={styles.ctaHeading}>Want to list your event?</p>
                <Link to="/contact" className={styles.ctaButton}>
                Get started here
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
