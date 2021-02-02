/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import * as colors from "../styles/colors";
import React from "react";

//component
import { EmailRow } from "../components/emailRow";

//utils
import { useSortData } from "../utils/sortData";

//img
import logo from "../assets/logo.png";

//svg
import { ReactComponent as ArrowOneSVG } from "../assets/icon_arrow01.svg";

//=====================================================

function ListItems({ searchResults }) {
  const [sortedData, setSortedData] = React.useState(null);
  const [toggle, setToggle] = React.useState(true);

  const { sortDates } = useSortData();

  //clears stale state when searchResults is updated
  React.useEffect(() => {
    setSortedData(null);
  }, [searchResults]);

  //SVGarrow toggler
  const invertSVG = toggle ? "rotate(180deg)" : "none";

  //order by dates toggler function (onClick -'Dates')
  function handleSortData(data) {
    setSortedData(sortDates([...data], toggle));
    setToggle(!toggle);
  }

  //If user has clicked on 'Dates' to reorder then map 'sortedData' instead
  const emails = sortedData?.length ? sortedData : searchResults;

  //checks for data in array
  const isData = searchResults.length;

  return (
    <div css={{ display: "grid" }}>
      {isData ? (
        <>
          <div>
            {isData ? (
              <EmailHeader
                searchResults={searchResults}
                handleSortData={handleSortData}
                invertSVG={invertSVG}
              />
            ) : null}
          </div>
          <div>
            {emails.map((email) => (
              <EmailRow email={email} />
            ))}
          </div>{" "}
        </>
      ) : (
        <div css={{ justifySelf: "center", padding: "50px" }}>
          <img css={{ width: "200px" }} alt="logo" src={logo} />
        </div>
      )}
    </div>
  );
}

export { ListItems };

//EmailHeader component
function EmailHeader({ searchResults, handleSortData, invertSVG }) {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        width: "1400px",
        borderBottom: `1px solid ${colors.gray}`,
        borderTop: `1px solid ${colors.gray}`,
        backgroundColor: `${colors.backgroundShade}`,
      }}
    >
      <EmailListHeader>From</EmailListHeader>
      <EmailListHeader>To</EmailListHeader>
      <EmailListHeader>Subject</EmailListHeader>
      <EmailListHeader
        css={{
          display: "flex",
          "&:hover": {
            color: "blue",
            cursor: "pointer",
          },
        }}
        onClick={() => handleSortData(searchResults)}
      >
        <div>Date</div>
        <div css={{ width: "13px", padding: "0 10px" }}>
          <ArrowOneSVG css={{ transform: `${invertSVG}` }} />
        </div>
      </EmailListHeader>
    </div>
  );
}

//====================================================

const EmailListHeader = styled.p({
  justifySelf: "baseline",
  padding: "0px 20px",
  color: `${colors.gray80}`,
  fontWeight: 700,
});
