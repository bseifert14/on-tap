import { useNavigate, useLocation } from "react-router-dom";

export default function ViewToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalendar = location.pathname === "/calendar";

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        style={{
          background: !isCalendar ? "#D80032" : "#E0E0E0",
          color: !isCalendar ? "#fff" : "#000",
          padding: "10px 20px",
          borderRadius: "20px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        List
      </button>
      <button
        style={{
          background: isCalendar ? "#D80032" : "#E0E0E0",
          color: isCalendar ? "#fff" : "#000",
          padding: "10px 20px",
          borderRadius: "20px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </button>
    </div>
  );
}
