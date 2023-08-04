import styled from "styled-components";
import { ResultType } from "../../components/Results/sample-data";

const DescriptionContainer = styled.div`
  margin-bottom: 48px;
  padding-left: 4px;
`;

type DescriptionProps = {
  result: ResultType;
};

export default function Description({ result }: DescriptionProps) {
  if (!result.details?.description) return null;
  return (
    <DescriptionContainer>{result.details.description}</DescriptionContainer>
  );
}
