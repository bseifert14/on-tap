import styles from "../../styles/Footer.module.css";

export default function FooterLogo() {
  return (
    <>
        <div className={styles.logoContainer}>
            <div className={styles.logoTop}>ON TAP</div>
            <div className={styles.logoBottom}>
                Stowe
                <span className={styles.logoPeriod}>.</span>
            </div>
        </div>
        <div className={styles.logoSubtext}>Your Local Guide</div>
    </>
  );
}
