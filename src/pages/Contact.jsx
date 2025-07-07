import React, { useState, useEffect } from "react";
import styles from "../styles/Contact.module.css";
import frascoDesktop from "../../public/images/site/frascoContactCrop.jpg";
import frascoMobile from "../../public/images/site/mobileContact.jpg"; // ← your mobile image

export default function Contact() {
  const [bgImage, setBgImage] = useState(frascoDesktop);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 768) {
        setBgImage(frascoMobile);
      } else {
        setBgImage(frascoDesktop);
      }
    };

    updateImage(); // set on mount

    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return (
    <div className={styles.contactWrapper}>
      <img src={bgImage.src} alt="Live show" className={styles.bgImage} />
      <div className={styles.imageOverlay} />

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div>
            <label className={styles.label}>Name</label>
            <input id="name" type="text" className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Email</label>
            <input id="email" type="email" className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Message</label>
            <textarea
              id="message"
              rows="7"
              className={styles.input}
              style={{ resize: "none" }} // optional if not in CSS
            />
          </div>
          <button type="submit" className={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
}
