export function geoDistributionPipeline() {
  return [
    {
      $group: {
        _id: "$default_address.city",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 }, // Sort by count in descending order
    },
  ];
}
