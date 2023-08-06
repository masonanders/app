import styled from "styled-components";
import { ReactComponent as SearchSVGIcon } from "../../assets/svg/icon-search.svg";
import { ChangeEventHandler, useState } from "react";
import theme from "../../theme";

const SearchbarContainer = styled.div`
  background-color: white;
  border-color: darkgray;
  border-radius: 4px 4px 0px 0px;
  border-style: solid;
  border-width: 1px;
  box-shadow: ${theme.shadow.default};
  display: flex;
  height: 48px;
  overflow: hidden;
  width: 400px;

  input {
    border: none;
    flex-grow: 1;
    font-size: 1.125rem;
    padding: 0;

    &::placeholder {
      color: darkgray;
    }

    &:focus-visible {
      outline: none;
    }
  }
`;

const SearchIcon = styled.div<{ active: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 48px;

  svg {
    fill: ${(props) => (props.active ? "black" : "darkgray")};
  }
`;

type SearchbarProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export default function Searchbar({ onChange, value }: SearchbarProps) {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <SearchbarContainer>
      <SearchIcon active={inputFocused || !!value}>
        <SearchSVGIcon />
      </SearchIcon>
      <input
        onBlur={() => setInputFocused(false)}
        onFocus={() => setInputFocused(true)}
        placeholder="Search..."
        type="text"
        value={value}
        onChange={onChange}
      />
    </SearchbarContainer>
  );
}
