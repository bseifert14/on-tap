import { Link } from 'react-router-dom';

import styles from '../../styles/About.module.css';

import G_LOVE from '../../../public/images/defaults/music.jpg';
import CHURCH from '../../../public/images/site/church.jpg';
import YOGA from '../../../public/images/site/jess-yoga-chin.jpg';

export default function About() {
  return (
    <div className={styles.aboutPageBody}>
      <div className={styles.topLevelContainer}>
        <h1>About On Tap</h1>
        <p className={styles.aboutHeader}>
          On Tap Stowe is your go to place to see what's happening around town.
        </p>
        <p className={styles.aboutText}>
          From live music and workshops to community events, we bring everything into one easy place.
        </p>
      </div>
      <div className={styles.testImageContainer}>
        <img src={CHURCH} alt="Stowe Church" className={styles.testImageMAIN} />
        <img src={YOGA} alt="Stowe Yoga" className={styles.testImageCHILD_ONE} />
      </div>
      <div className={styles.midLevelContainer}>
        <p className={styles.aboutText}>
          As locals, we’ve missed out on events simply because we didn’t know they were happening. So we built something we wished already existed: one central place where businesses and individuals can what’s going on, and where the community can easily find it. No more missing the good stuff.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={G_LOVE} alt="G Love in Stowe" className={styles.imageUPDATE} />
      </div>
      <div className={styles.ctaWrapper}>
            <p className={styles.ctaHeading}>Want to list your event?</p>
            <Link to="/contact" className={styles.ctaButton}>
              Get started here
            </Link>
        </div>
    </div>
  );
}
