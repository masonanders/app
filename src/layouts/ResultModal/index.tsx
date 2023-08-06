import styled from "styled-components";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import { useContext } from "react";
import { ResultContext } from "../../contexts/ResultContext";

const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 480px;
`;

const CloseButtonContainer = styled.div`
  color: lightgrey;
  cursor: pointer;
  font-size: 28px;
  margin: 24px;
  position: absolute;
  right: 0;
  top: 0;
`;

export default function ResultModal() {
  const { modalResult: result, setModalResult } = useContext(ResultContext);

  if (!result) return null;
  return (
    <ModalBackground onClick={() => setModalResult(null)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader result={result} />
        <ModalBody result={result} />
        <ModalFooter result={result} />
      </ModalContainer>
      <CloseButtonContainer>&#x2715;</CloseButtonContainer>
    </ModalBackground>
  );
}
