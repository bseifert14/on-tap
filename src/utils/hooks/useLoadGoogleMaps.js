import { useEffect } from "react";

export default function useLoadGoogleMaps(apiKey) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [apiKey]);
}