import styled from "styled-components";
import Searchbar from "./Searchbar";
import { ChangeEventHandler, useCallback, useState } from "react";
import Results from "./Results";
import { ResultType } from "../../data/sample-data";

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
};

export default function UIOverlay({ onSelectResult }: UIOverlayProps) {
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
      <Results searchValue={searchValue} onSelectResult={onSelectResult} />
    </UIOverlayContainer>
  );
}
