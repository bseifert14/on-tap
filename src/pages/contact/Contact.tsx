import styles from "../../styles/Contact.module.css";
import FormLabel from "../../components/form/FormLabel";
import useContactForm from "../../utils/hooks/useContactForm";
import { PhotoRef } from "../../constants/photoRef";
import { ArrowRight } from "lucide-react";

export default function Contact() {
    const { form, errors, isSubmitting, handleChange, handleSubmit } = useContactForm();
    const inputClass = (field: keyof typeof errors) =>
        `${styles.formInput} ${errors[field] ? styles.inputError : ""}`;

  return (
    <>
        <div className={styles.hero}>
            <div className={styles.heroImg} style={{ "--hero-bg": `url("${PhotoRef.FrascoApresTwo}")` } as React.CSSProperties}  />
            <div className={styles.heroContent}>
                <div className={styles.heroEyebrow}>Contact</div>
                <h1 className={styles.heroTitle}>Get In Touch</h1>
            </div>
        </div>
        <section className={styles.bodySection}>
            <div className={styles.contactIntro}>
                <p>Have questions about an event or want to list your own? Drop us a line and we'll get back to you faster than the gondola can take you to the top of the mountain.</p>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formTitle}>Send us a message</div>
                <div className={styles.formSubtitle}>We typically respond within one to two business days.</div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    noValidate
                >
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <FormLabel label="Name" isRequired={true} name="name" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Your name"
                                className={inputClass("name")}
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <FormLabel label="Email" isRequired={true} name="email" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="your@email.com"
                                className={inputClass("email")}
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <FormLabel label="Message" isRequired={true} name="message" />
                        <textarea
                            id="message"
                            name="message"
                            rows={7}
                            autoComplete="off"
                            placeholder="Tell us what you're thinking..."
                            className={inputClass("message")}
                            value={form.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            aria-invalid={!!errors.message}
                            style={{ resize: "none" }}
                        />
                        {errors.message && <p className={styles.error}>{errors.message}</p>}
                    </div>
                    {errors.form && <p className={styles.error}>{errors.form}</p>}
                        
                    <button type="submit" className={styles.formSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send Message"}
                        <ArrowRight size={18} strokeWidth={1.5} />
                    </button>
                </form>
            </div>
        </section>
    </>
  );
}
