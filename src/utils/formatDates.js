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
