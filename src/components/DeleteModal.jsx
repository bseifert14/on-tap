export default function DeleteModal({ onConfirm, onCancel }) {
    return (
      <div style={modalOverlay}>
        <div style={modalBox}>
          <h3>Are you sure you want to delete this event?</h3>
          <div style={{ marginTop: 10 }}>
            <button onClick={onConfirm} style={{ background: "#e3003b", color: "#fff" }}>
              Yes, Delete
            </button>
            <button onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const modalOverlay = {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
  };
  
  const modalBox = {
    background: "#fff", padding: 20, borderRadius: 8, minWidth: 300
  };
  