import GoogleMap from "./layouts/GoogleMap";
import SearchOverlay from "./layouts/SearchOverlay";
import ResultModal from "./layouts/ResultModal";
import { MapContextProvider } from "./contexts/GoogleMapContext";
import { ResultContextProvider } from "./contexts/ResultContext";

export default function App() {
  return (
    <MapContextProvider>
      <ResultContextProvider>
        <div>
          <GoogleMap />
          <SearchOverlay />
          <ResultModal />
        </div>
      </ResultContextProvider>
    </MapContextProvider>
  );
}
