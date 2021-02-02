# Admin Console Email System

A user interface mockup of an admin console for an email system that can retreive emails from a database using a selected date range input. Built using React.

## Original design plan

The goal of this project was to recreate and code the original design images given by designers along with some criteria. 
1) The emails can be retrieved by a given search date range input.
2) The emails can be sorted by date.
3) Multiple bodies of the emails can be viewed at the same time.

Images from designers

[![Screen-Shot-2021-02-02-at-12-33-42.png](https://i.postimg.cc/htmDYhMV/Screen-Shot-2021-02-02-at-12-33-42.png)](https://postimg.cc/gxYbXzC0)
[![Screen-Shot-2021-02-02-at-12-35-31.png](https://i.postimg.cc/Px5kdqb3/Screen-Shot-2021-02-02-at-12-35-31.png)](https://postimg.cc/Y4ZP3MsY)
[![Screen-Shot-2021-02-02-at-12-36-28.png](https://i.postimg.cc/CxR7ppfG/Screen-Shot-2021-02-02-at-12-36-28.png)](https://postimg.cc/rDLx5bjs)

### Approach

Different components were identified during the planning stage and in React they were seperated into various components, Results, CalenderBar, ResultHeader, ListItems, EmailRow.
The react libray 'react-dates' was used for the 'CalenderBar' component to be able to search emails for a given date range search input. The 'ResultHeader' component was used to display the number of emails retrieved from the search. The 'ListItems' component maps the data that was retrieved from the search and passes it down to the 'EmailRow'.

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

### CalenderBar.js

The CalenderBar component uses date range picker from 'react-date' so the user can make a date range selection. A handleSearch function is passed down as props to the searchbutton component. When the onClick eventHandler is fired the selected dates are set in the parent state and those values are used as the argument for the 'useSearch' custom hook which then finds and returns the relevant emails.
[![Screen-Shot-2021-02-02-at-13-06-33.png](https://i.postimg.cc/63tJcxWX/Screen-Shot-2021-02-02-at-13-06-33.png)](https://postimg.cc/PL3Rfcv3)

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

The 'ListItems' component maps the data to the 'EmailRow' component which uses Accordian from the 'Reach-UI' library so the user can inspect multiple bodies of emails at the same time. The user can also sort the email by date by clicking on the date arrow icon. A custom hook 'useSortData' was used to handle data sorting.
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


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
