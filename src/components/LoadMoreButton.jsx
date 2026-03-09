import { ArrowDown } from "lucide-react";
import styles from "../styles/LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick, isLoading }) {

  const getButtonText = () => {
    if (isLoading) {
      return "Loading...";
    }
    return (
      <div className={styles.buttonContent}>
        Load More
        <ArrowDown size={18} strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className={styles.loadMoreWrap}>
        <button
            className={styles.loadMoreBtn}
            onClick={onClick}
            disabled={isLoading}
        >
            {getButtonText()}
        </button>
    </div>
  );
}
