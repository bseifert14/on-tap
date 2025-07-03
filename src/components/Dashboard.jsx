import { useState } from "react";
import { supabase } from "../supabase";

export default function Dashboard({ user }) {
  const [title, setTitle] = useState("");

  const addEvent = async () => {
    const { error } = await supabase.from("events").insert({
      title,
      created_by: user.uid
    });

    if (error) alert("Failed to add event");
    else setTitle("");
  };

  return (
    <div>
      <h2>Add Event</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
      <button onClick={addEvent}>Add</button>
    </div>
  );
}
