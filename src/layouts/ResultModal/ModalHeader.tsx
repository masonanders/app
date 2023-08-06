import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import theme from "../../theme";
import ResultInfo from "./ResultInfo";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

const Button = styled.button`
  background-color: ${theme.palette.primary()};
  border-radius: 4px;
  border: none;
  box-shadow: ${theme.shadow.default};
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  height: 100%;
  letter-spacing: 0.025rem;
  padding-left: 24px;
  padding-right: 24px;

  transition: ${theme.transition.easeInOut({ property: "background-color" })};

  &:hover {
    background-color: ${theme.palette.primary("dark")};
  }

  &:active {
    background-color: ${theme.palette.primary("darker")};
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
