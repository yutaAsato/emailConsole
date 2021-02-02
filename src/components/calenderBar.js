/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import * as colors from "../styles/colors";

//react-dates
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
//svg
import { ReactComponent as CalenderSVG } from "../assets/icon_calender.svg";
import { ReactComponent as SearchIconSVG } from "../assets/icon_search.svg";

//=========================================================

function CalenderBar({
  startDate,
  endDate,
  focus,
  handleOnDateChange,
  setFocus,
  handleSearch,
}) {
  return (
    <div
      css={{
        display: "flex",
        border: "2px solid",
        borderRadius: "15px",
        width: "450px",
        color: `${colors.gray}`,
        backgroundColor: `${colors.gray}`,
      }}
    >
      <div
        css={{
          display: "flex",
          border: "1.1px solid",
          color: `${colors.gray}`,
          width: "350px",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        <StyledDatePickerWrapper>
          <DateRangePicker
            startDatePlaceholderText="Start"
            startDate={startDate}
            onDatesChange={handleOnDateChange}
            endDatePlaceholderText="End"
            endDate={endDate}
            numberOfMonths={2}
            showClearDates={true}
            focusedInput={focus}
            onFocusChange={(focus) => setFocus(focus)}
            startDateId="startDate"
            endDateId="endDate"
            isOutsideRange={() => false}
            customInputIcon={<CalenderIcon />}
          />
        </StyledDatePickerWrapper>
      </div>
      <SearchButton handleSearch={handleSearch} />
    </div>
  );
}

export { CalenderBar };

//CalenderIcon
function CalenderIcon() {
  return (
    <div css={{ width: "30px", margin: "auto auto" }}>
      <CalenderSVG />
    </div>
  );
}

//SearchButton
function SearchButton({ handleSearch }) {
  return (
    <div css={{ padding: "10px 30px" }}>
      <div css={{ width: "30px", margin: "auto auto" }}>
        <button css={{ border: "none" }} onClick={handleSearch}>
          <div
            css={{
              width: "30px",
              margin: "auto auto",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <SearchIconSVG />
          </div>
        </button>
      </div>
    </div>
  );
}

//====================================================

//wrapper for react-dates to override default styles
const StyledDatePickerWrapper = styled.div`
  & .DateRangePickerInput,
  .DateRangePickerInput_withBorder {
    border: 0px;
  }
  .DateInput_input {
    text-align: center;
    font-size: 1rem;
    border-bottom: 0;
    padding: 12px 0px 14px;
  }
  .DateInput {
    width: 100px;
  }
  .DateRangePickerInput_arrow_svg {
    padding: 10px 10px;
  }
  .DateRangePickerInput_clearDates {
    margin: auto auto;
  }
`;
