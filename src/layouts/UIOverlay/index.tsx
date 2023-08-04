import styled from "styled-components";

const UIOverlayContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;

  & > * {
    pointer-events: auto;
  }
`;

export default function UIOverlay() {
  return (
    <UIOverlayContainer>
        Overlay
    </UIOverlayContainer>
  );
}
