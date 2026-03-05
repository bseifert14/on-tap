import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

export function formatEventDateTime(start, endTime) {
  const startDate = parseISO(start);
  const startTimeStr = format(startDate, 'h:mm a');

  let endTimeStr = "";
  if (endTime) {
    const endDate = parseISO(endTime);
    endTimeStr = ` - ${format(endDate, 'h:mm a')}`;
  }

  if (isToday(startDate)) {
    return `Today • ${startTimeStr}${endTimeStr}`;
  }

  if (isTomorrow(startDate)) {
    return `Tomorrow • ${startTimeStr}${endTimeStr}`;
  }

  if (isThisWeek(startDate)) {
    return `${format(startDate, 'EEEE')} • ${startTimeStr}${endTimeStr}`;
  }

  return `${format(startDate, 'EEE, MMM d')} • ${startTimeStr}${endTimeStr}`;
}

export function formatEventStartTime(start) {
  const startDate = parseISO(start);
  const startTimeStr = format(startDate, 'h:mm a');

  if (isToday(startDate)) {
    return `Today • ${startTimeStr}`;
  }

  if (isTomorrow(startDate)) {
    return `Tomorrow • ${startTimeStr}`;
  }

  if (isThisWeek(startDate)) {
    return `${format(startDate, 'EEEE')} • ${startTimeStr}`;
  }

  return `${format(startDate, 'EEE, MMM d')} • ${startTimeStr}`;
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

  export function getTimeLabel() {
    // Determine 'today' or 'tonight' based on user's local time
    const hour = new Date().getHours();
    return (hour >= 3 && hour < 15) ? "today" : "tonight";
  }

/** FOR BACKEND USE */
export function formatStartTime(timestamp) {
  const date = new Date(timestamp);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  
  return time;
}