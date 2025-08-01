import styles from "../../styles/common/forms.module.css";

export default function FormLabel({ label, isRequired, name }) {

  return (
    <label className={`${styles.formLabel} ${isRequired ? styles.required : ''}`} htmlFor={name}>{label}</label>
  );
}
