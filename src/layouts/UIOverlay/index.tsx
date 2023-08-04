import styled from "styled-components";
import Searchbar from "../../components/Searchbar";
import { ChangeEventHandler, useCallback, useState } from "react";

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
    </UIOverlayContainer>
  );
}
