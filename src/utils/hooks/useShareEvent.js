import { useState } from "react";

export function useShareEvent() {
  const [toastVisible, setToastVisible] = useState(false);

  const shareEvent = async (event) => {
    const { event_name, id, event_business_name, business_name } = event;
    const location = event_business_name || business_name;
    const url = `https://ontap-events.com/events/${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: event_name,
          text: `${event_name} at ${location} — check it out on On Tap Stowe`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    }
  };

  return { shareEvent, toastVisible };
}