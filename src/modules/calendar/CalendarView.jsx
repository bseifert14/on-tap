import { useMemo, useState } from "react";
import Calendar from "react-calendar";

import styles from "../../styles/CalendarView.module.css";
import "../../styles/react-calendar-custom.css";

import useGetCalendarDots from "../../utils/hooks/useGetCalendarDots";
import useGetCalendarDayEvents from "../../utils/hooks/useGetCalendarDayEvents";

import EventModal from "../../components/events/EventModal";
import EventCardSkeleton from "../../components/events/EventCardSkeleton";
import LoadMoreButton from "../../components/LoadMoreButton";
import EventList from "../../components/events/EventList";

function toDateKeyLocal(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function monthRangeKeys(activeStartDate) {
  const start = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
  const end = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0);
  return { startKey: toDateKeyLocal(start), endKey: toDateKeyLocal(end) };
}

export default function CalendarView({ selectedType, searchTerm }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { startKey, endKey } = useMemo(() => monthRangeKeys(activeStartDate), [activeStartDate]);

  const selectedDateStr = toDateKeyLocal(selectedDate);

  const { dates: dotDates } = useGetCalendarDots({
    start: startKey,
    end: endKey,
    selectedType,
    searchTerm,
  });

  const datesWithEvents = useMemo(() => new Set(dotDates), [dotDates]);

  const {
    events: dayEvents,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    error,
  } = useGetCalendarDayEvents({
    date: selectedDateStr,
    selectedType,
    searchTerm,
    pageSize: 12,
  });


  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
          tileClassName={({ date, view }) => {
            if (view !== "month") return "";

            const dateStr = toDateKeyLocal(date);
            const hasEvent = datesWithEvents.has(dateStr);
            const isSelected = dateStr === selectedDateStr;

            return [
              hasEvent ? styles.hasEvent : "",
              isSelected ? styles.selectedDay : "",
            ].join(" ");
          }}
        />
      </div>

      <div className={styles.eventsWrapper}>
        <h3 className={styles.eventsHeader}>
          Events on{" "}
          {selectedDate.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>

        <div className={styles.eventScrollArea}>
          {isLoading && <EventCardSkeleton />}

          {!isLoading && (
            <>
              <EventList
                currentView="calendar"
                events={dayEvents}
                onSelectEvent={(event) => setSelectedEvent(event)}
              />

              {hasMore && (
                <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
              )}
            </>
          )}

          {error && <div style={{ padding: 12 }}>Something went wrong loading events.</div>}
        </div>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
