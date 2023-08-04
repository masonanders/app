import styled from "styled-components";
import Searchbar from "../../components/Searchbar";
import { ChangeEventHandler, useCallback, useState } from "react";
import Results from "../../components/Results";
import { ResultType } from "../../components/Results/sample-data";

const UIOverlayContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;

  & > * {
    pointer-events: auto;
  }
`;

export default function UIOverlay() {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);

  const handleSearchOnChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  const handleSelectResult = useCallback<(result: ResultType) => void>(
    (result) => {
      setResult(result);
    },
    []
  );

  return (
    <UIOverlayContainer>
      <Searchbar value={searchValue} onChange={handleSearchOnChange} />
      <Results searchValue={searchValue} onSelectResult={handleSelectResult} />
    </UIOverlayContainer>
  );
}
