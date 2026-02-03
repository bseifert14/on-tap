import styles from '../../styles/About.module.css';
import CHURCH from '../../../public/images/site/church.jpg';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

export default function AboutHero() {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            { isMobile ? (
                <section className={styles.heroContainer}>
                    {/* <img src={CHURCH} alt="Stowe Church" className={styles.illustration} /> */}
                    <div className={styles.aboutHeroTextContainer}>
                        <p className={styles.aboutHeroText}>Your Guide to the Heart of Stowe</p>
                    </div>
                    <div className={styles.aboutHeroSubTextContainer}>
                        <p className={styles.aboutHeroSubText}>
                            Connecting you with authentic local experiences and community-driven events.
                        </p>
                    </div>
                </section>
            ) : (
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
            )}
        </>
        
    );
}
