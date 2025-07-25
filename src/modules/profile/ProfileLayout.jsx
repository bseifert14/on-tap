import { useState } from "react";
import styles from "../../styles/ProfileLayout.module.css";
import ProfileEvents from "./ProfileEvents";
import ProfileSettings from "./ProfileSettings";

export default function ProfileLayout({ user }) {
  const [activeTab, setActiveTab] = useState("events");

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Profile</h2>
        <div className={styles.tabs}>
          <button
            className={activeTab === "events" ? styles.active : styles.tab}
            onClick={() => setActiveTab("events")}
          >
            My Events
          </button>
          <button
            className={activeTab === "business" ? styles.active : styles.tab}
            onClick={() => setActiveTab("business")}
          >
            Business Profile
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.user}>
          Logged in with, {user.email}
        </div>  
        {activeTab === "events" ? (
          <ProfileEvents user={user} />
        ) : (
          <ProfileSettings user={user} />
        )}
      </div>
    </div>
  );
}
