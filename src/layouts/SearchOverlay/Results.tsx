import styled from "styled-components";
import sampleData, { ResultType } from "../../data/sample-data";
import Result from "./Result";
import { useMemo } from "react";
import NoResult from "./NoResult";
import ResultsMapManager from "./ResultsMapManager";
import palette from "../../theme/palette";
import theme from "../../theme";

const ResultsContainer = styled.div`
  background-color: white;
  border-color: darkgray;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-shadow: ${theme.shadow.default};
  font-size: 0.875rem;
  margin-top: 24px;
  overflow: hidden;
  width: 400px;
`;

const ResultsHeader = styled.div`
  background-color: ${palette.primary()};
  border-bottom-color: darkgray;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: white;
  letter-spacing: 0.05rem;
  padding: 12px 16px;
`;

const ResultsBody = styled.ul`
  background-color: white;
  max-height: ${68 * 8}px;
  overflow-y: auto;
  padding: 8px 0;

  & > li {
    box-sizing: border-box;
    height: 68px;
    padding: 16px;
  }
`;

type ResultsProps = {
  searchValue: string;
};

export default function Results({ searchValue }: ResultsProps) {
  const results: ResultType[] = useMemo(
    () =>
      searchValue
        ? sampleData.filter(({ name }) =>
            name
              .toLocaleLowerCase()
              .split(" ")
              .some((word) => word.startsWith(searchValue.toLocaleLowerCase()))
          )
        : [],
    [searchValue]
  );

  return (
    <ResultsMapManager results={results}>
      {!!searchValue && (
        <ResultsContainer>
          <ResultsHeader>{`Found ${results.length} Result${
            results.length === 1 ? "" : "s"
          }:`}</ResultsHeader>
          <ResultsBody>
            {results.length ? (
              results.map((result) => (
                <Result key={result.id} result={result} />
              ))
            ) : (
              <NoResult />
            )}
          </ResultsBody>
        </ResultsContainer>
      )}
    </ResultsMapManager>
  );
}
