import styled from "styled-components";
import {
  ResultCoords,
  ResultIcon,
  ResultTitle,
  ResultCoordsContainer as _ResultCoordsContainer,
  ResultTitleContainer as _ResultTitleContainer,
} from "../../components/Result";
import { ResultType } from "../../data/sample-data";
import palette from "../../theme/palette";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

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

const Button = styled.button`
  background-color: ${palette.primary()};
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  height: 100%;
  letter-spacing: 0.025rem;
  padding-left: 24px;
  padding-right: 24px;

  &:hover {
    background-color: ${palette.primary("dark")};
  }

  &:active {
    background-color: ${palette.primary("darker")};
  }
`;

type ModalHeaderProps = {
  result: ResultType;
};

export default function ModalHeader({ result }: ModalHeaderProps) {
  return (
    <HeaderContainer>
      <ResultInfoContainer>
        <ResultIcon />
        <ResultTitle Container={ResultTitleContainer} result={result} />
        <ResultCoords Container={ResultCoordsContainer} result={result} />
      </ResultInfoContainer>
      {result.details?.website && (
        <a href={result.details.website}>
          <Button>Visit Website</Button>
        </a>
      )}
    </HeaderContainer>
  );
}
