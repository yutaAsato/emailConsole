import { dummyData } from "../utils/dummyData";
import moment from "moment";

//Search dummydata
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

export { useSearch };
