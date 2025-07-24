import React from "react";
import styles from '../../styles/EmptyEventsView.module.css';
import emptyEventsView from '../../../public/images/site/empty-events-view.png';

export default function EmptyEventsView({ currentView }) {
    const message = currentView === 'list' ?
        'Try selecting a different day in the \'Calendar\' view or adjusting your filters.' :
        'Try selecting a different day or adjusting your filters.'
  return (
    <div>
        <div className={styles.emptyState}>
            <img src={emptyEventsView} alt="Empty stage" className={styles.image} />
            <h2>No events scheduled for today.</h2>
            <p>{message}</p>
        </div>
    </div>
  );
}
