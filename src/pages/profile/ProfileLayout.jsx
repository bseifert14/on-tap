import { useState } from "react";
import styles from "../../styles/revamp/ProfileLayout.module.css";
import ProfileEvents from "./ProfileEvents";
import ProfileBusiness from "./ProfileBusiness";

export default function ProfileLayout({ user }) {
  const [activeTab, setActiveTab] = useState("events");

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>My Profile</h2>
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
      {activeTab === "events" ? (
        <ProfileEvents user={user} />
      ) : (
        <ProfileBusiness user={user} />
      )}
    </div>
  );
}
