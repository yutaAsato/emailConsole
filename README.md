# Admin Console Email System

A user interface mockup of an admin console for an email system that can retreive emails from a database using a selected date range input. Built using React.

![me](https://media.giphy.com/media/3w9BQl0i880RAcRnte/giphy.gif)

## Original design plan

The goal of this project was to recreate and code the original design images given by designers along with some criteria. 
1) The emails can be retrieved by a given search date range input.
2) The emails can be sorted by date.
3) Multiple bodies of the emails can be viewed at the same time.

#### Design Images

[![Screen-Shot-2021-02-02-at-12-33-42.png](https://i.postimg.cc/htmDYhMV/Screen-Shot-2021-02-02-at-12-33-42.png)](https://postimg.cc/gxYbXzC0)
[![Screen-Shot-2021-02-02-at-12-35-31.png](https://i.postimg.cc/Px5kdqb3/Screen-Shot-2021-02-02-at-12-35-31.png)](https://postimg.cc/Y4ZP3MsY)
[![Screen-Shot-2021-02-02-at-12-36-28.png](https://i.postimg.cc/CxR7ppfG/Screen-Shot-2021-02-02-at-12-36-28.png)](https://postimg.cc/rDLx5bjs)

### Approach

Different components were identified during the planning stage and in React they were seperated into various components, Results, CalenderBar, ResultHeader, ListItems, EmailRow.
The react library 'react-dates' was used for the 'CalenderBar' component to be able to search emails for a given date range search input. The 'ResultHeader' component was used to display the number of emails retrieved from the search. The 'ListItems' component maps the data that was retrieved from the search and passes it down to the 'EmailRow' component.
The emotion library was used for styles making use of Styled-Components as well as CSS-in-JS.

#### Results.js
```js
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
```

### CalenderBar Component

The CalenderBar component uses date range picker from 'react-date' so the user can make a date range selection. A handleSearch function is passed down as props to the searchbutton component. When the onClick eventHandler is fired the selected dates are set in the parent state and those values are used as the argument for the 'useSearch' custom hook which then finds and returns the relevant emails. The 'MomentJS' library was used to help format and sort the dates.
[![Screen-Shot-2021-02-02-at-13-06-33.png](https://i.postimg.cc/63tJcxWX/Screen-Shot-2021-02-02-at-13-06-33.png)](https://postimg.cc/PL3Rfcv3)

#### CalenderBar.js
```js
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
```

#### useSearch
```js
function useSearch(query) {
  let results = [];

  dummyData.map((email) => {
    const emailDate = moment(moment(email.Date)._d).format("MM/DD/YYYY");

    const queryStart = query?.startDate
      ? moment(query.startDate._d).format("MM/DD/YYYY")
      : null;
    const queryEnd = query?.endDate
      ? moment(query.endDate._d).format("MM/DD/YYYY")
      : null;

    if (
      moment(emailDate).isSameOrAfter(queryStart) &&
      moment(emailDate).isSameOrBefore(queryEnd)
    ) {
      results.push(email);
    }
  });

  return results.join().replace(/,/g, "").length === 0 ? [] : results;
}
```


### ResultHeader + ListItems + EmailRow Component

The 'ListItems' component maps the data to the 'EmailRow' component which uses Accordian from the 'Reach-UI' library so the user can click and inspect multiple bodies of emails at the same time. The user can also sort the emails by date by clicking on the date arrow icon. A custom hook 'useSortData' was used to handle data sorting.
[![Screen-Shot-2021-02-02-at-13-25-41.png](https://i.postimg.cc/m2scftm3/Screen-Shot-2021-02-02-at-13-25-41.png)](https://postimg.cc/nM3VqcbM)

#### ListItems.js

```js
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
```
#### EmailRow.js
```js
function EmailRow({ email }) {
  const { isToday, isMonth } = useDateConverter();

  //formatteddate
  let formattedDate;
  if (isToday(email?.Date)) {
    formattedDate = moment(email?.Date).format("H:HH");
  } else if (isMonth(email?.Date)) {
    formattedDate = moment(email?.Date).format("MMM DD");
  } else {
    formattedDate = moment(email?.Date).format("YYYY/MM/DD");
  }

  //Foramatted 'To' - If email is sent to more than one person show '...' after first address and a number with recipient number.
  let formattedTo;
  let recipientCount;
  const reciever = email?.To;
  if (typeof reciever === "object") {
    recipientCount = reciever.length - 1;
    formattedTo = `${reciever[0]},  ...`;
  } else {
    recipientCount = null;
    formattedTo = reciever;
  }

  //main markup
  const accordianButtonMarkup = (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        width: "1400px",
        borderBottom: "2px black",
        "&:hover": {
          cursor: "pointer",
          color: "blue",
        },
      }}
    >
      <EmailMain>{email?.From}</EmailMain>
      <Wrapper>
        <EmailMain css={{ maxWidth: 250 }}>{formattedTo}</EmailMain>
        <ElementWrapper
          css={{ display: "flex", justifyContent: "center", width: "60px" }}
        >
          {recipientCount ? (
            <RecipientCountWrapper>{`+${recipientCount}`}</RecipientCountWrapper>
          ) : null}
        </ElementWrapper>
      </Wrapper>

      <Wrapper>
        <EmailMain css={{ maxWidth: 250 }}>{email?.Subject}</EmailMain>
        <ElementWrapper>
          {email?.Attachment ? <ClipSVG /> : null}
        </ElementWrapper>
      </Wrapper>
      <EmailMain>{formattedDate}</EmailMain>
    </div>
  );

  //body markup
  const accordianPanelMarkup = (
    <div css={{ display: "inline-flex", width: "1400px" }}>
      <div css={{ padding: "20px 20px" }}>{email?.Body}</div>
    </div>
  );

  return (
    <div>
      <Accordion collapsible multiple>
        <AccordionItem>
          {email?.From ? (
            <AccordionButton
              css={{
                padding: "0 0",
                background: "white",
                border: "none",
                borderBottom: `2px solid ${colors.gray}`,
              }}
            >
              <div>{accordianButtonMarkup}</div>
            </AccordionButton>
          ) : null}
          <AccordionPanel css={{ width: "1400px" }}>
            <div>{accordianPanelMarkup}</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export { EmailRow };

//======================================================

const EmailMain = styled.div({
  padding: "20px 20px",
  justifySelf: "baseline",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 300,
  whiteSpace: "nowrap",
  fontSize: "1.1rem",
});

const Wrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "300px 50px",
});

const ElementWrapper = styled.div({
  width: "20px",
  margin: "auto auto",
});

const RecipientCountWrapper = styled.div({
  width: "30px",
  border: `1px solid ${colors.gray10}`,
  borderRadius: "5px",
  backgroundColor: "gray",
  color: "white",
  fontWeight: "700",
  fontSize: "1.1rem",
});
```

#### useSortData
```js
/Custom hook for sorting email data
function useSortData() {
  //sortDates
  const sortDates = React.useCallback((emails, toggle) => {
    const data = emails ? [...emails] : null;
    const sorted = data?.sort((a, b) =>
      toggle ? a.Date - b.Date : b.Date - a.Date
    );

    return sorted;
  }, []);

  return { sortDates };
}
```


