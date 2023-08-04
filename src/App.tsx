import { useCallback, useState } from "react";
import GoogleMap from "./layouts/GoogleMap";
import UIOverlay from "./layouts/UIOverlay";
import { ResultType } from "./components/Results/sample-data";

export default function App() {
  const [selectedResult, setSelectedResult] = useState<ResultType | null>(null);

  const handleSelectResult = useCallback<(result: ResultType) => void>(
    (result) => {
      setSelectedResult(result);
    },
    []
  );

  return (
    <div>
      <GoogleMap />
      <UIOverlay onSelectResult={handleSelectResult} />
    </div>
  );
}
