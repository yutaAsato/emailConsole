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

Different components were identified during the planning stage and in React they were seperated into 3 main components, CalenderBar, ResultHeader, ListItems.
The react libray 'react-dates' was used for the CalenderBar component to be able to search emails for a given date range search input. The ResultHeader component 
was used to simply display the number of emails retrieved from the search. The ListItems component displays a list of all the emails that were retrieved from the search.

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

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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
