import styles from "../../styles/common/forms.module.css";

interface FormLabelProps {
    label: string;
    isRequired?: boolean;
    name: string;
}

export default function FormLabel({ label, isRequired, name }: FormLabelProps) {
    return (
      <label className={`${styles.formLabel} ${isRequired ? styles.required : ''}`} htmlFor={name}>{label}</label>
    );
}
