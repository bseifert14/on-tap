import React from 'react';
import styles from '../../styles/common/Banner.module.css';
import { AlertTriangle } from 'lucide-react';

export default function Banner({ message, type = 'warning' }) {
  return (
    <div className={`${styles.banner} ${styles[type]}`}>
      <AlertTriangle className={styles.icon} size={18} />
      <span>{message}</span>
    </div>
  );
}
