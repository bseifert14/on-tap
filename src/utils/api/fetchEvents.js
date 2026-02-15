/**
 * Fetches events from the API based on the provided parameters.
 * @param {*} params 
 * @returns data in json format or throws an error if the request fails
 */
export async function fetchEvents(params) {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`/api/events?${queryString}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json?.error || "Failed to fetch events");

    //calendar_dots returns { dates: [...] }
    if (Array.isArray(json.dates)) return json.dates;

    return json.data ?? [];
}

