import styles from "../../styles/EventModal.module.css";
import skeleton from "../../styles/skeletons/EventModalSkeleton.module.css";
import Modal from "../common/Modal";

export default function EventModalSkeleton({ onClose }) {
  return (
    <Modal
      onClose={onClose}
      image={<div className={`${styles.image} ${skeleton.imageSkeleton}`} />}
      footer={<div className={`${skeleton.footerSkeleton} ${skeleton.imageSkeleton}`} />}
    >
        <div className={`${skeleton.titleSkeleton} ${skeleton.imageSkeleton}`}/>
        <div className={`${skeleton.valueSkeleton} ${skeleton.imageSkeleton}`} />
        <div className={`${skeleton.valueSkeleton} ${skeleton.imageSkeleton}`} />
    </Modal>
  );
}
