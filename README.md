# On Tap Events

A community event discovery platform for Stowe, Vermont — helping locals and visitors find everything happening in town, from live music and dining to various other activities and local business events.

**Live site:** [ontap-events.com](https://ontap-events.com)

---

## Features

- **Event feed:** Paginated list of upcoming events with infinite scroll
- **Calendar view:** Visual monthly calendar with indicators to let users know which days have events. Event Feed following the calendar.
- **Search & filtering:** Full text search across event name, location, and business name; filter by event category & type
- **Event detail modals:** Simple event cards with date/time, location, description, age info, external links, and ability to share
- **User accounts:** Supabase backed auth with profile dashboard for managing submitted events and business info
- **Business profiles:** Businesses can manage their listings and event submissions
- **Responsive design:** Mobile first layout (but all devices/platforms supported) with view mode toggle between list and calendar

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| API | Vercel serverless functions |
| Date handling | date-fns, react-calendar, react-datepicker |
| Icons | lucide-react |
| Notifications | sonner |
| Styling | CSS Modules |


## Architecture

The app follows a lightweight, hook-driven architecture with no global state library.

**API layer:** A single Vercel serverless function (`/api/events.js`) handles all data fetching via a `mode` query parameter: `list`, `search`, `calendar`, `calendar_dots`, `day`, and `by_id`. This keeps database logic server-side and out of the client bundle.

**Custom hooks:** Data fetching is encapsulated in React hooks (`useGetListEvents`, `useGetCalendarDayEvents`, `useGetCalendarDots`), keeping components declarative and easy to test.

**Modal routing:** Event detail views use React Router's `backgroundLocation` state pattern, rendering the event as a modal overlay while preserving the underlying feed scroll position.

**Auth:** Session state is managed at the App level via `supabase.auth.onAuthStateChange()` and passed down through props, avoiding unnecessary re-renders.

## Deployment

The app is deployed on [Vercel](https://vercel.com). The `vercel.json` config handles SPA routing rewrites and `www` to apex domain redirects.
