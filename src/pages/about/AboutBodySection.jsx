import { Heart, Map, MountainSnow } from "lucide-react";
import styles from "../../styles/AboutBodySection.module.css";

export default function AboutBodySection() {
    return (
        <section>
            <div className={styles.introStrip}>
                <p>
                    On Tap Stowe was born with a <strong>simple goal:</strong> to help the community stay connected with everything going on around town. Whether it's a familiar local favorite or something new happening this weekend, <strong>no more missing the good stuff.</strong>
                </p>
            </div>

            <div className={styles.pillars}>
                <div className={styles.pillar}>
                    <div className={styles.pillarHeader}>
                        <MountainSnow color="#d6252c" />
                        <h3>Community Vision</h3>
                    </div>
                    <p>
                        Our community thrives when we come together. Knowing what's happening around town helps all of us show up, support local businesses, see great live music, and be part of something real.
                    </p>
                </div>

                <div className={styles.pillar}>
                    <div className={styles.pillarHeader}>
                        <Map color="#d6252c" />
                        <h3>The Guide</h3>
                    </div>
                    <p>
                        We bring events together in one easy place, so you always know what's on tap around town. Whether you're a local, a visitor, or somewhere in between; On Tap Stowe keeps you in the loop.
                    </p>
                </div>

                <div className={styles.pillar}>
                    <div className={styles.pillarHeader}>
                        <Heart color="#d6252c" />
                        <h3>Local Spirit</h3>
                    </div>
                    <p>
                        Stowe is more than a destination. It's a living, breathing community with incredible people doing incredible things. We're here to shine a light on all of it.
                    </p>
                </div>
            </div>
            
        </section>
    );
}
