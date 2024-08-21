export function geoDistributionPipeline() {
  return [
    {
      $group: {
        _id: "$default_address.country",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 }, // Sort by count in descending order
    },
  ];
}
