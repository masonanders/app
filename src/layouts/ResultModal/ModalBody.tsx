import styled from "styled-components";
import { ResultType } from "../../components/Results/sample-data";
import Description from "./Description";
import ImageCarousel from "./ImageCarousel";

const BodyContainer = styled.div`
  border-top-color: #e6e6e6;
  border-top-style: solid;
  border-top-width: 2px;
  padding: 20px 12px 12px;
`;

type ModalBodyType = {
  result: ResultType;
};

export default function ModalBody({ result }: ModalBodyType) {
  if (!result.details?.description || !result.images?.length) return null;
  return (
    <BodyContainer>
      <Description result={result} />
      <ImageCarousel result={result} />
    </BodyContainer>
  );
}
