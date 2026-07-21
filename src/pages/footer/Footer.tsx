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
            <button
               type="button"
               onClick={onLogout}
               aria-label="Log out"
             >
              Log Out
             </button>
          ) : (
            <button
               type="button"
               onClick={onLoginClick}
               aria-label="Log In"
             >
              Log In
             </button>
          )}
        </div>

        <div className={styles.footerCopy}>
          © 2026 On Tap Stowe, All rights reserved.
        </div>
      </div>
    </footer>
  );
}
