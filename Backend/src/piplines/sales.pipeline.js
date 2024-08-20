export function salesPipeline(interval) {
  return [
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
          $dateTrunc: {
            date: "$created_at_date",
            unit: interval,
          },
        },
        totalSales: {
          $sum: { $toDouble: "$total_price_set.shop_money.amount" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];
}
