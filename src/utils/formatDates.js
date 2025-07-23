import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

export function formatEventDateTime(isoString) {
  const date = parseISO(isoString);

  if (isToday(date)) {
    return `Today • ${format(date, 'h:mm a')}`;
  }

  if (isTomorrow(date)) {
    return `Tomorrow • ${format(date, 'h:mm a')}`;
  }

  if (isThisWeek(date)) {
    return `${format(date, 'EEEE')} • ${format(date, 'h:mm a')}`; // e.g., "Thursday • 4:00 PM"
  }

  return `${format(date, 'EEE, MMM d')} • ${format(date, 'h:mm a')}`; // e.g., "Mon, Jul 28 • 7:00 PM"
}

export function generateTimeOptions(start, end, interval) {
    const times = [];
    let [h, m] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
  
    while (h < endH || (h === endH && m <= endM)) {
      const hourStr = h.toString().padStart(2, "0");
      const minStr = m.toString().padStart(2, "0");
      times.push(`${hourStr}:${minStr}`);
  
      m += interval;
      if (m >= 60) {
        m -= 60;
        h += 1;
      }
    }
  
    return times;
  }
  
  export function formatTime(time) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  }
