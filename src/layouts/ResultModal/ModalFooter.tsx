import styled from "styled-components";
import Divider from "../../components/Divider";
import { ResultType } from "../../data/sample-data";
import TrafficChart from "./TrafficChart";

const FooterContainer = styled.div`
  padding: 0px 12px 12px;
`;

type ModalFooterProps = {
  result: ResultType;
};

export default function ModalFooter({ result }: ModalFooterProps) {
  const avgStoreTraffig = result?.details?.avgStoreTraffic;

  if (!avgStoreTraffig) return null;
  return (
    <>
      <Divider />
      <FooterContainer>
        <TrafficChart avgStoreTraffic={avgStoreTraffig} />
      </FooterContainer>
    </>
  );
}
