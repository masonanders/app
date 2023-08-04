import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMap() {
  const [mapEl, setMapEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mapEl) {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      loader.load().then(async () => {
        const { Map }: google.maps.MapsLibrary =
          (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

        new Map(mapEl, {
          center: {
            lat: -34.397,
            lng: 150.644,
          },
          scrollwheel: false,
          zoom: 8,
          disableDefaultUI: true,
        });
      });
    }
  }, [mapEl]);

  return <div ref={setMapEl} style={{ height: "100vh", width: "100vw" }} />;
}
