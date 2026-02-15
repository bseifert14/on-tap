import styles from "../styles/LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick, isLoading }) {

  return (
    <div className={styles.loadMoreWrap}>
        <button
            className={styles.loadMoreBtn}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? "Loading..." : "Load More"}
        </button>
    </div>
  );
}
