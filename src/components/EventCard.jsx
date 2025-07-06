import styles from "../styles/EventCard.module.css";

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <img
        src="https://via.placeholder.com/100x100.png?text=Event"
        alt="Event"
        className={styles.image}
      />
      <div className={styles.content}>
        <p className={styles.location}>Stowe, VT • {event.event_date}</p>
        <h3 className={styles.title}>
          {event.event_name}
        </h3>
        <p className={styles.description}>
          {event.event_description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        </p>
      </div>
      <div className={styles.icon}>↗</div>
    </div>
  );
}
