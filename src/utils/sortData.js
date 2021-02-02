import React from "react";

//Custom hook for sorting email data
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

export { useSortData };
