import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import palette from "../../theme/palette";
import transitions from "../../theme/transitions";
import ResultInfo from "./ResultInfo";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
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

  transition: ${transitions.easeInOut({ property: "background-color" })};

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
      <ResultInfo result={result} />
      {result.details?.website && (
        <a href={result.details.website}>
          <Button>Visit Website</Button>
        </a>
      )}
    </HeaderContainer>
  );
}
