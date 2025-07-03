import { useState } from "react";
import ViewControls from "../components/ViewControls";
import CalendarView from "../components/CalendarView";

export default function Calendar() {
  const [selectedType, setSelectedType] = useState("All");

  return (
    <div>
      <ViewControls
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        currentView="calendar"
      />
      <CalendarView selectedType={selectedType} />
    </div>
  );
}