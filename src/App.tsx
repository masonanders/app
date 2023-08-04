import { useCallback, useState } from "react";
import GoogleMap from "./layouts/GoogleMap";
import UIOverlay from "./layouts/UIOverlay";
import { ResultType } from "./components/Results/sample-data";
import ResultModal from "./layouts/ResultModal";

export default function App() {
  const [selectedResult, setSelectedResult] = useState<ResultType | null>(null);

  const handleSelectResult = useCallback<(result: ResultType) => void>(
    (result) => {
      setSelectedResult(result);
    },
    []
  );

  const handleCloseModal = useCallback(() => setSelectedResult(null), []);

  return (
    <div>
      <GoogleMap />
      <UIOverlay onSelectResult={handleSelectResult} />
      <ResultModal onClose={handleCloseModal} result={selectedResult} />
    </div>
  );
}
