import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import { ResultCoords, ResultIcon, ResultTitle } from "../../components/Result";
import transitions from "../../theme/transitions";

const ResultContainer = styled.li`
  column-gap: 16px;
  cursor: pointer;
  display: grid;
  grid-template-areas:
    "icon title"
    "icon coord";
  grid-template-columns: 32px auto;
  row-gap: 8px;

  transition: ${transitions.easeInOut({ property: "background-color" })};

  &:hover {
    background-color: ghostwhite;
  }
  &:active {
    background-color: #eeeefa;
  }
`;
type ResultProps = {
  onClick: (result: ResultType) => void;
  onMouseOut: () => void;
  onMouseOver: (result: ResultType) => void;
  result: ResultType;
};

export default function Result({
  onClick,
  onMouseOut,
  onMouseOver,
  result,
}: ResultProps) {
  return (
    <ResultContainer
      onClick={() => onClick(result)}
      onMouseOut={onMouseOut}
      onMouseOver={() => onMouseOver(result)}
    >
      <ResultIcon />
      <ResultTitle result={result} />
      <ResultCoords result={result} />
    </ResultContainer>
  );
}
