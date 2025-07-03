import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import AddEditEventModal from "../components/AddEditEventModal";
import DeleteModal from "../components/DeleteModal";
import { format } from "date-fns";

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const [business, setBusiness] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    address: ""
  });

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [businessId, setBusinessId] = useState(null);

  useEffect(() => {
    if (user) {
      loadEvents();
      loadBusinessAndContact();
    }
  }, [user, sortAsc]);

  // ---------- Events ----------
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

  // ---------- Business & Contact ----------
  const loadBusinessAndContact = async () => {
    const { data: biz, error: bizError } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", user.uid)
      .single();

    if (biz) {
      setBusiness(biz);
      setBusinessId(biz.id);

      const { data: contactData } = await supabase
        .from("contacts")
        .select("*")
        .eq("business_id", biz.id)
        .single();

      if (contactData) {
        setContact(contactData);
      }
    }
  };

  const saveBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .upsert({ ...business, user_id: user.uid })
      .select()
      .single();

    if (!error) {
      setBusinessId(data.id);
      alert("Business info saved!");
    } else {
      console.error(error);
      alert("Error saving business info");
    }
  };

  const saveContact = async () => {
    if (!businessId) {
      alert("Please save business info first.");
      return;
    }

    const { error } = await supabase
      .from("contacts")
      .upsert({ ...contact, business_id: businessId });

    if (!error) {
      alert("Contact info saved!");
    } else {
      console.error(error);
      alert("Error saving contact info");
    }
  };

  const handleChange = (setter) => (field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>My Profile</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: 16 }}>
        <button
          style={activeTab === "events" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("events")}
        >
          My Events
        </button>
        <button
          style={activeTab === "business" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("business")}
        >
          Business Profile
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === "events" && (
        <>
          <div style={{ marginBottom: 16 }}>
            <button onClick={() => setShowModal(true)}>+ Add Event</button>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginLeft: 12 }}
            />
            <button onClick={() => setSortAsc(!sortAsc)} style={{ marginLeft: 8 }}>
              Sort by Date {sortAsc ? "↑" : "↓"}
            </button>
          </div>

          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
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
                  <td>{event.event_photo_url ? (
                    <a href={event.event_photo_url} target="_blank" rel="noreferrer">View</a>
                  ) : "—"}</td>
                  <td>
                    <button onClick={() => { setEditingEvent(event); setShowModal(true); }}>
                      Edit
                    </button>
                    <button onClick={() => setEventToDelete(event)} style={{ marginLeft: 6 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Business Profile Tab */}
      {activeTab === "business" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 500 }}>
          <h3>Business Information</h3>
          <input placeholder="Business Name" value={business.name} onChange={e => handleChange(setBusiness)("name", e.target.value)} />
          <input placeholder="Business Location" value={business.location} onChange={e => handleChange(setBusiness)("location", e.target.value)} />
          <input placeholder="Business Phone Number" value={business.phone} onChange={e => handleChange(setBusiness)("phone", e.target.value)} />
          <input placeholder="Business Email" value={business.email} onChange={e => handleChange(setBusiness)("email", e.target.value)} />
          <input placeholder="Business Address" value={business.address} onChange={e => handleChange(setBusiness)("address", e.target.value)} />
          <button onClick={saveBusiness}>Save Business Info</button>

          <h3 style={{ marginTop: 24 }}>Primary Contact</h3>
          <input placeholder="Contact Name" value={contact.name} onChange={e => handleChange(setContact)("name", e.target.value)} />
          <input placeholder="Contact Phone" value={contact.phone} onChange={e => handleChange(setContact)("phone", e.target.value)} />
          <input placeholder="Contact Email" value={contact.email} onChange={e => handleChange(setContact)("email", e.target.value)} />
          <button onClick={saveContact}>Save Contact Info</button>
        </div>
      )}

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

const tabStyle = {
  padding: "0.5rem 1rem",
  background: "#eee",
  border: "none",
  cursor: "pointer"
};

const activeTabStyle = {
  ...tabStyle,
  background: "#e3003b",
  color: "#fff",
  fontWeight: "bold"
};
