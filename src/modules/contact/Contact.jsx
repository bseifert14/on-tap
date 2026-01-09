import React, { useState, useEffect } from "react";
import styles from "../../styles/Contact.module.css";
import frascoDesktop from "../../../public/images/site/frascoContactCrop.jpg";
import frascoMobile from "../../../public/images/site/mobileContact.jpg";
import FormLabel from "../../components/form/FormLabel";
import useContactForm from "../../utils/hooks/useContactForm";

export default function Contact() {
  const [bgImage, setBgImage] = useState(frascoDesktop);
  const { form, errors, isSubmitting, handleChange, handleSubmit } = useContactForm();

  useEffect(() => {
    const updateImage = () => {
      setBgImage(window.innerWidth <= 768 ? frascoMobile : frascoDesktop);
    };
    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  const inputClass = (field) =>
    `${styles.input} ${errors[field] ? styles.inputError : ""}`;

  return (
    <div className={styles.contactWrapper}>
      <img src={bgImage.src} alt="Live show" className={styles.bgImage} />
      <div className={styles.imageOverlay} />

      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
        >
          {/* Honeypot: hidden */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={form.website}
            onChange={(e) => handleChange("website", e.target.value)}
            style={{ display: "none" }}
          />

          <div>
            <FormLabel label="Name" isRequired={true} name="name" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={inputClass("name")}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div>
            <FormLabel label="Email" isRequired={true} name="email" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass("email")}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div>
            <FormLabel label="Message" isRequired={true} name="message" />
            <textarea
              id="message"
              name="message"
              rows="7"
              autoComplete="off"
              className={inputClass("message")}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              aria-invalid={!!errors.message}
              style={{ resize: "none" }}
            />
            {errors.message && <p className={styles.error}>{errors.message}</p>}
          </div>

          {errors.form && <p className={styles.error}>{errors.form}</p>}

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
