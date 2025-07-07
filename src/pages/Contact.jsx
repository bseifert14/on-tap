import React from "react";
import styles from "../styles/ContactPage.module.css";
import fadeImg from "../../public/images/fade-photo.jpg"; // Your image path

export default function Contact() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label className={styles.label}>
          Name
          <input type="text" className={styles.input} />
        </label>

        <label className={styles.label}>
          Email
          <input type="email" className={styles.input} />
        </label>

        <label className={styles.label}>
          Message
          <textarea className={styles.textarea} rows="5" />
        </label>

        <button type="submit" className={styles.button}>Send</button>
      </form>

      <div className={styles.imageFadeWrapper}>
        <img src={fadeImg} alt="Decorative" className={styles.fadeImage} />
        <div className={styles.imageOverlay}></div>
      </div>
    </div>
  );
}
