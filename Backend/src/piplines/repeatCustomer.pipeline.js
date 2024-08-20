export function repeatCustomerPipeline(interval) {
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
      $match: {
        orders_count: { $gt: 1 },
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
        customerIds: { $addToSet: "$_id" },
        repeatCount: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];
}
