import styles from '../../styles/common/Banner.module.css';
import { AlertTriangle } from 'lucide-react';

interface BannerProps {
  message: string;
  type?: 'warning' | 'error' | 'success';
}

export default function Banner({ message, type = 'warning' }: BannerProps) {
  return (
    <div className={`${styles.banner} ${styles[type]}`}>
      <AlertTriangle className={styles.icon} size={18} />
      <span>{message}</span>
    </div>
  );
}
