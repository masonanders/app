import { PropsWithChildren, createContext, useState } from "react";
import { ResultType } from "../data/sample-data";

type ResultValue = ResultType | null;
type ResultSetter = (result: ResultValue) => void;

export const ResultContext = createContext<{
  modalResult: ResultValue;
  setModalResult: ResultSetter;
  hoveredListResult: ResultValue;
  setHoveredListResult: ResultSetter;
  focusedMapResult: ResultValue;
  setFocusedMapResult: ResultSetter;
}>({
  modalResult: null,
  setModalResult: () => {},
  hoveredListResult: null,
  setHoveredListResult: () => {},
  focusedMapResult: null,
  setFocusedMapResult: () => {},
});

export function ResultContextProvider({ children }: PropsWithChildren) {
  const [modalResult, setModalResult] = useState<ResultValue>(null);
  const [hoveredListResult, setHoveredListResult] = useState<ResultValue>(null);
  const [focusedMapResult, setFocusedMapResult] = useState<ResultValue>(null);

  return (
    <ResultContext.Provider
      value={{
        modalResult,
        setModalResult,
        hoveredListResult,
        setHoveredListResult,
        focusedMapResult,
        setFocusedMapResult,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}
