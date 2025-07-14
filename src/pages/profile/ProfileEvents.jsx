import { useEffect, useState } from "react";
import styles from "../../styles/revamp/ProfileEvents.module.css";
import { supabase } from "../../supabase";
import AddEditEventModal from "../../components/AddEditEventModal";
import DeleteModal from "../../components/DeleteModal";
import { format } from "date-fns";

export default function ProfileEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (user) loadEvents();
  }, [user, sortAsc]);

  const loadEvents = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", user.uid);

    if (!error && data) {
      data = data.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
      setEvents(data);
    }
  };

  const handleSaveEvent = () => {
    setShowModal(false);
    setEditingEvent(null);
    loadEvents();
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    await supabase.from("events").delete().eq("id", eventToDelete.id);
    setEventToDelete(null);
    loadEvents();
  };

  const filtered = events.filter(e =>
    e.event_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className={styles.controls}>
        <button onClick={() => setShowModal(true)}>+ Add Event</button>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by Date {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(event => (
            <tr key={event.id}>
              <td>{event.event_type}</td>
              <td>{event.event_name}</td>
              <td>{event.event_location}</td>
              <td>{event.event_date ? format(new Date(event.event_date), "PPP") : "—"}</td>
              <td>{event.event_description}</td>
              <td>
                {event.event_photo_url ? (
                  <a href={event.event_photo_url} target="_blank" rel="noreferrer">View</a>
                ) : "—"}
              </td>
              <td>
                <button onClick={() => { setEditingEvent(event); setShowModal(true); }}>Edit</button>
                <button onClick={() => setEventToDelete(event)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddEditEventModal
          user={user}
          event={editingEvent}
          onClose={() => {
            setShowModal(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}

      {eventToDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setEventToDelete(null)}
        />
      )}
    </div>
  );
}
