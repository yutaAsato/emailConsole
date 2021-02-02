/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import * as colors from "../styles/colors";

//react-dates
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

//customHooks
import { useSearch } from "../utils/searchIconResults";
import { useSortData } from "../utils/sortData";

//components
import { ListItems } from "../components/listItems";
import { CalenderBar } from "../components/calenderBar";

//================================================================

function Results() {
  const [dateRange, setdateRange] = React.useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;
  const [focus, setFocus] = React.useState(null);
  const [queryDates, setQueryDates] = React.useState(null);
  const { sortDates } = useSortData();

  //reorder the intial unordered useSearch results
  let searchResults = sortDates(useSearch(queryDates));

  const handleOnDateChange = ({ startDate, endDate }) =>
    setdateRange({ startDate, endDate });

  function handleSearch() {
    setQueryDates(dateRange);
  }

  console.log("searchResults", searchResults);

  return (
    <div>
      <MainGrid css={{ paddingTop: "50px" }}>
        <CalenderBar
          startDate={startDate}
          endDate={endDate}
          handleOnDateChange={handleOnDateChange}
          focus={focus}
          setFocus={setFocus}
          handleSearch={handleSearch}
        />
      </MainGrid>
      <div css={{ paddingLeft: "50px" }}>
        <ResultsHeader searchResults={searchResults} />
      </div>
      <MainGrid>
        <ListItems searchResults={searchResults} />
      </MainGrid>
    </div>
  );
}

export { Results };

function ResultsHeader({ searchResults }) {
  const emailCount = searchResults?.length;

  return (
    <div css={{ width: "1400px", borderBottom: `1px solid ${colors.gray}` }}>
      <p
        css={{ color: `${colors.gray80}`, fontWeight: 800, fontSize: "1.1rem" }}
      >
        Results: {emailCount} mail(s)
      </p>
    </div>
  );
}

//=========================================

const MainGrid = styled.div({
  padding: "0px 50px 50px 50px",
});
