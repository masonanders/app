import styled, { StyledComponent } from "styled-components";
import { ReactComponent as IconPinSVG } from "../assets/svg/icon-pin.svg";
import { ResultType } from "../data/sample-data";
import palette from "../theme/palette";

export const ResultIconContainer = styled.div`
  align-items: center;
  display: flex;
  grid-area: icon;
  justify-content: center;

  & svg {
    fill: ${palette.primary()};
    height: 32px;
    width: 32px;
  }
`;

export function ResultIcon({
  Container = ResultIconContainer,
}: {
  Container?: StyledComponent<any, any>;
}) {
  return (
    <Container>
      <IconPinSVG />
    </Container>
  );
}

export const ResultTitleContainer = styled.div`
  font-weight: bold;
  grid-area: title;
`;

export function ResultTitle({
  Container = ResultTitleContainer,
  result,
}: {
  Container?: StyledComponent<any, any>;
  result: ResultType;
}) {
  return <Container>{result.name}</Container>;
}

export const ResultCoordsContainer = styled.div`
  color: darkgray;
  grid-area: coord;
`;

export function ResultCoords({
  Container = ResultCoordsContainer,
  result,
}: {
  Container?: StyledComponent<any, any>;
  result: ResultType;
}) {
  return (
    <Container>{`${result.location.lat}, ${result.location.lon}`}</Container>
  );
}
