import styles from "../../styles/Hero.module.css";

export default function Hero({
  variant = "home",
  title,
  subtitleTop,
  subtitleBottom,
  ctaLabel,
  bgImageUrl,
}) {
  return (
    <section
      className={`${styles.hero} ${styles[variant]}`}
      style={{ "--hero-bg": `url("${bgImageUrl}")` }}
    >
      <div className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      
      <div className={styles.middle}>
        {variant === "home" && subtitleTop && (
          <p className={styles.subtitleTop}>{subtitleTop}</p>
        )}
      </div>

      <div className={styles.ctaBottom}>
        {variant === "home" && ctaLabel && (
            <a href="#eventSection" className={styles.cta}>
                {ctaLabel}
            </a>
        )}
        </div>

        <div className={styles.subTitleBottom}>
            {variant === "about" && subtitleBottom && (
                <p className={styles.subtitleBottomText}>{subtitleBottom}</p>
            )}
        </div>
    </section>
  );
}
