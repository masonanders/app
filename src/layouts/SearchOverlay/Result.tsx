import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import { ResultCoords, ResultIcon, ResultTitle } from "../../components/Result";
import theme from "../../theme";
import { useContext } from "react";
import { ResultContext } from "../../contexts/ResultContext";

const ResultContainer = styled.li`
  column-gap: 16px;
  cursor: pointer;
  display: grid;
  grid-template-areas:
    "icon title"
    "icon coord";
  grid-template-columns: 32px auto;
  row-gap: 8px;

  transition: ${theme.transition.easeInOut({ property: "background-color" })};

  &:hover {
    background-color: ghostwhite;
  }
  &:active {
    background-color: #eeeefa;
  }
`;
type ResultProps = {
  result: ResultType;
};

export default function Result({ result }: ResultProps) {
  const { setFocusedMapResult, setHoveredListResult } =
    useContext(ResultContext);

  return (
    <ResultContainer
      onClick={() => setFocusedMapResult(result)}
      onMouseOut={() => setHoveredListResult(null)}
      onMouseOver={() => setHoveredListResult(result)}
    >
      <ResultIcon />
      <ResultTitle result={result} />
      <ResultCoords result={result} />
    </ResultContainer>
  );
}
