import styled from "styled-components";
import { ReactComponent as IconPinSVG } from "../../assets/svg/icon-pin.svg";
import { ResultType } from "./sample-data";

const ResultContainer = styled.li`
  column-gap: 16px;
  cursor: pointer;
  display: grid;
  grid-template-areas:
    "icon title"
    "icon coord";
  grid-template-columns: 32px auto;
  row-gap: 8px;

  &:hover {
    background-color: ghostwhite;
  }
  &:active {
    background-color: #eeeefa;
  }
`;

const ResultIcon = styled.div`
  align-items: center;
  display: flex;
  grid-area: icon;
  justify-content: center;

  & svg {
    fill: #5281f7;
    height: 32px;
    width: 32px;
  }
`;

const ResultTitle = styled.div`
  font-weight: bold;
  grid-area: title;
`;

const ResultCoord = styled.div`
  color: darkgray;
  grid-area: coord;
`;

type ResultProps = {
  onClick: (result: ResultType) => void;
  result: ResultType;
};

export default function Result({ onClick, result }: ResultProps) {
  const {
    name,
    location: { lat, lon },
  } = result;
  return (
    <ResultContainer onClick={() => onClick(result)}>
      <ResultIcon>
        <IconPinSVG />
      </ResultIcon>
      <ResultTitle>{name}</ResultTitle>
      <ResultCoord>{`${lat}, ${lon}`}</ResultCoord>
    </ResultContainer>
  );
}
