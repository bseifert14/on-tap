import { ArrowDown } from "lucide-react";
import styles from "../styles/LoadMoreButton.module.css";

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

export default function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {

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
