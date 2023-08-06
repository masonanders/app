import styled from "styled-components";
import Searchbar from "./Searchbar";
import { useState } from "react";
import Results from "./Results";

const SearchOverlayContainer = styled.div`
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

export default function SearchOverlay() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchOverlayContainer>
      <Searchbar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Results searchValue={searchValue} />
    </SearchOverlayContainer>
  );
}
