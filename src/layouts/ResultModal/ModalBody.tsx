import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import Description from "./Description";
import ImageCarousel from "./ImageCarousel";
import Divider from "../../components/Divider";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 12px 12px;
  row-gap: 48px;
`;

type ModalBodyType = {
  result: ResultType;
};

export default function ModalBody({ result }: ModalBodyType) {
  if (!result.details?.description || !result.images?.length) return null;
  return (
    <>
      <Divider />
      <BodyContainer>
        <Description result={result} />
        <ImageCarousel result={result} />
      </BodyContainer>
    </>
  );
}
