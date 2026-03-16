import React from "react";

export default function ConfirmLogoutModal({ onConfirm, onCancel }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Are you sure you want to log out?</h3>
        <div style={{ marginTop: 20 }}>
          <button onClick={onConfirm} style={confirmButton}>Log Out</button>
          <button onClick={onCancel} style={cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, width: "100%", height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex", justifyContent: "center", alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  background: "white", padding: 24, borderRadius: 8,
  boxShadow: "0 0 20px rgba(0,0,0,0.2)", textAlign: "center",
  maxWidth: '90%'
};

const confirmButton = {
  backgroundColor: "#D31145",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
  marginRight: 10,
  cursor: "pointer"
};

const cancelButton = {
  backgroundColor: "#eee",
  color: "#333",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
  cursor: "pointer"
};
