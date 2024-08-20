import { salesPipeline } from "../piplines/sales.pipeline.js";
import { salesCollection } from "../utils/constants.util.js";
import { calculateGrowthRate, getCollection } from "../utils/helpers.js";

const validIntervals = ["day", "month", "quarter", "year"];

export async function getSales(req, res) {
  const interval = req.params.interval;

  const collection = getCollection(salesCollection);

  if (!validIntervals.includes(interval)) {
    return res
      .status(400)
      .json({ error: "Invalid interval. Use day, month, quarter, or year." });
  }

  try {
    const salesData = await collection
      .aggregate(salesPipeline(interval))
      .toArray();

    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to retrieve sales data" });
  }
}

export async function getGrowthRate(req, res) {
  const interval = req.params.interval;

  const collection = getCollection(salesCollection);

  if (!validIntervals.includes(interval)) {
    return res
      .status(400)
      .json({ error: "Invalid interval. Use day, month, quarter, or year." });
  }

  try {
    const salesData = await collection
      .aggregate(salesPipeline(interval))
      .toArray();

    // *** calculating growth Rate in sales manually

    const salesGrowthData = calculateGrowthRate(salesData);

    res.status(200).json(salesGrowthData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to retrieve sales Growth data" });
  }
}
