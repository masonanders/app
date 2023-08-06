import { PropsWithChildren, createContext, useState } from "react";

type Map = google.maps.Map | null;

export const MapContext = createContext<{
  map: Map;
  setMap: (map: google.maps.Map) => void;
}>({ map: null, setMap: () => undefined });

export function MapContextProvider({ children }: PropsWithChildren) {
  const [map, setMap] = useState<Map>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}
