import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';
import FooterLogo from './FooterLogo';

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerStyle}>
        <FooterLogo />

        <div className={styles.footerLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <Link to="/contact">Contact</Link>
        </div>

        <div className={styles.footerCopy}>
          © 2026 On Tap Stowe, All rights reserved.
        </div>
      </div>
    </footer>
  );
}
