import { getCollection } from "../utils/helpers.js";
import { geoDistributionPipeline } from "../piplines/geoCustomer.pipeline.js";
import { repeatCustomerPipeline } from "../piplines/repeatCustomer.pipeline.js";
import { customerCollection, validIntervals } from "../utils/constants.util.js";

export async function getNewCustomersInCurrentMonth(req, res) {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const collection = getCollection(customerCollection);

    const newCustomers = await collection
      .aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: {
                dateString: "$created_at",
              },
            },
          },
        },
        {
          $match: {
            created_at_date: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
          count: { $sum: 1 },
        },
      ])
      .toArray();
    if (!newCustomers.length)
      return res
        .status(200)
        .json({ success: true, message: "No new customers in this month" });

    return res.status(200).json({
      success: true,
      data: newCustomers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Controller to identify repeat customers
export async function getRepeatedCustomers(req, res) {
  try {
    const interval = req.params.interval;

    const collection = getCollection(customerCollection);

    if (!validIntervals.includes(interval)) {
      return res.status(400).json({
        success: false,
        message:
          'request for valid interval: "day", "month", "quarter", "year"',
      });
    }

    const repeatCustomers = await collection
      .aggregate(repeatCustomerPipeline(interval))
      .toArray();
    if (!repeatCustomers.length)
      return res
        .status(200)
        .json({ success: true, message: "no repeated customers exist" });

    res.status(200).json({ data: repeatCustomers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCustomersGeoData(req, res) {
  const collection = getCollection(customerCollection);

  try {
    const customerGeoData = await collection
      .aggregate(geoDistributionPipeline())
      .toArray();

    res.status(200).json({ success: true, data: customerGeoData });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to retrieve sales data" });
  }
}

// Controller function for Customer Lifetime Value by Cohorts
export async function getCustomerLifetimeValueByCohorts(req, res) {
  try {
    const collection = getCollection(customerCollection);
    const pipeline = [
      {
        $addFields: {
          created_at_date: {
            $dateFromString: {
              dateString: "$created_at",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at_date" },
            month: { $month: "$created_at_date" },
          },
          totalSpent: { $sum: { $toDouble: "$total_spent" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();

    const formattedResults = results.map((item) => ({
      cohort: `${item._id.year}-${item._id.month}`,
      totalSpent: item.totalSpent,
      customerCount: item.count,
    }));

    res.status(200).json({ success: true, data: formattedResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
