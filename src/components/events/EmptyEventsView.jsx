import styles from '../../styles/EmptyEventsView.module.css';
import emptyEventsView from '/images/site/empty-events-view.png';

export default function EmptyEventsView({ currentView }) {
  const message = currentView === 'list' ?
        'Try selecting a different filter or adjusting your search query.' :
        'Try selecting a different day or adjusting your filters.';
    
  return (
    <div>
        <div className={styles.emptyState}>
            <img src={emptyEventsView} alt="Empty stage" className={styles.image} />
            <h2>No events scheduled.</h2>
            <p>{message}</p>
        </div>
    </div>
  );
}
