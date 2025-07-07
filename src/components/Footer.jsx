import styles from '../styles/Footer.module.css';
import { Instagram, X, Facebook, Mail } from 'lucide-react';
import logo from "../../public/images/site/OnTapDieCutWhite.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <img src={logo} alt="On Tap Stowe" className={styles.logo} />

        <div className={styles.socials}>
          <a href="#" className={styles.icon}><Instagram size={24} /></a>
          <a href="#" className={styles.icon}><X size={24} /></a>
          <a href="#" className={styles.icon}><Facebook size={24} /></a>
          <a href="#" className={styles.icon}><Mail size={24} /></a>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>© 2025 On Tap Stowe, All rights reserved.</p>
        <div className={styles.links}>
          <a href="#">Privacy & Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
