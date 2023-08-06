import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import {
  ResultCoords,
  ResultIcon,
  ResultTitle,
  ResultCoordsContainer as _ResultCoordsContainer,
  ResultTitleContainer as _ResultTitleContainer,
} from "../../components/Result";

const ResultInfoContainer = styled.div`
  column-gap: 16px;
  display: grid;
  grid-template-areas:
    "icon title"
    "icon coord";
  grid-template-columns: 32px auto;
  row-gap: 6px;
`;

const ResultTitleContainer = styled(_ResultTitleContainer)`
  font-size: 1.25rem;
  opacity: 0.75;
`;

const ResultCoordsContainer = styled(_ResultCoordsContainer)`
  font-size: 0.875rem;
`;

type ResultInfoProps = {
  result: ResultType;
};

export default function ResultInfo({ result }: ResultInfoProps) {
  return (
    <ResultInfoContainer>
      <ResultIcon />
      <ResultTitle Container={ResultTitleContainer} result={result} />
      <ResultCoords Container={ResultCoordsContainer} result={result} />
    </ResultInfoContainer>
  );
}
