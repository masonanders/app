import styled from "styled-components";

const NoResultContainer = styled.li`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px;
`;

export default function NoResult() {
  return <NoResultContainer>Try another search query</NoResultContainer>;
}
