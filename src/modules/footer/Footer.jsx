import styles from '../../styles/Footer.module.css';
import FooterLogo from './FooterLogo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterLogo />

      <div className={styles.footerLinks}>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>

      <div className={styles.footerCopy}>
        © 2026 On Tap Stowe, All rights reserved.
      </div>
    </footer>
  );
}
