import { client } from "../app.js";
import { DB_NAME } from "./constants.util.js";

export const calculateGrowthRate = (salesData) => {
  return salesData.map((current, index, array) => {
    if (index === 0) {
      return {
        ...current,
        growthRate: 0, // No previous data for the first item
      };
    } else {
      const previous = array[index - 1];
      const growthRate =
        ((current.totalSales - previous.totalSales) / previous.totalSales) *
        100;
      return {
        ...current,
        growthRate: growthRate,
      };
    }
  });
};

export function getCollection(collectName) {
  const database = client.db(DB_NAME);
  const collection = database.collection(collectName);
  return collection;
}
