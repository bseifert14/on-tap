import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import styles from '../../styles/Footer.module.css';
import FooterLogo from './FooterLogo';

interface FooterProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Footer({ user, onLoginClick, onLogout }: FooterProps) {
  return (
    <footer>
      <div className={styles.footer}>
        <FooterLogo />

        <div className={styles.footerLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <Link to="/contact">Contact</Link>
          {user ? (
            <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Log Out</a>
          ) : (
            <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Log In</a>
          )}
        </div>

        <div className={styles.footerCopy}>
          © 2026 On Tap Stowe, All rights reserved.
        </div>
      </div>
    </footer>
  );
}
