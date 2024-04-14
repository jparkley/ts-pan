"use strict";
import { apiData, IUserData } from "./apiData";

//**************************************************** */
// Return payload ordered by state and count of users
//**************************************************** */

const getData = (apiData: IUserData[]) => {
  console.log("data", apiData);

  // filter data (users' count over 1000)
  const filteredData = apiData.filter((item) => item.countofUsers > 1000);
  // console.log("🚀 ~~ filteredData:", filteredData);

  // sort by state first
  filteredData.sort((a, b) => a.state.localeCompare(b.state));
  // console.log("after 1st sorting: ", filteredData);

  const dataByStateMap = new Map<string, IUserData[]>();
  filteredData.map((item) => {
    if (!dataByStateMap.has(item.state)) {
      dataByStateMap.set(item.state, [item]);
    } else {
      const currentValue = dataByStateMap.get(item.state);
      const newValue =
        currentValue === undefined ? [item] : [...currentValue!, item];
      dataByStateMap.set(item.state, newValue);
    }
  });
  // console.log("Map created: ", dataByStateMap);

  // sort the map values by count of users desc
  const finalData: IUserData[] = [];
  for (let entry of dataByStateMap.entries()) {
    entry[1].sort((a, b) => b.countofUsers - a.countofUsers);
    entry[1].map((item) => finalData.push(item));
  }
  // console.log("after 2nd sorting: ", dataByStateMap);

  return finalData;
};

const sorted = getData(apiData);
console.log("🚀====== sorted by state and count of users(desc) ======");
console.log(sorted);
