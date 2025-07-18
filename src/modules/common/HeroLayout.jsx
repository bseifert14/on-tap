import styles from "../../styles/ViewControls.module.css";
import ViewToggle from '../../components/ViewToggle';

export default function HeroLayout({ currentView }) {

  return (
    <div>
      <h1 className={styles.heading}>Discover live music, events, and more — all in one place</h1>

      <div className={styles.toggleWrapper}>
        <ViewToggle currentView={currentView} />
      </div>
    </div>
  );
}
