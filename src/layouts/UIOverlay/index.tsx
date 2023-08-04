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

type UIOverlayProps = {
  onSelectResult: (result: ResultType) => void;
  selectedResult: ResultType | null;
};

export default function UIOverlay({
  onSelectResult,
  selectedResult,
}: UIOverlayProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchOnChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  return (
    <UIOverlayContainer>
      <Searchbar value={searchValue} onChange={handleSearchOnChange} />
      <Results
        searchValue={searchValue}
        selectedResult={selectedResult}
        onSelectResult={onSelectResult}
      />
    </UIOverlayContainer>
  );
}
