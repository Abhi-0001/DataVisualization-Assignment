// export const BASE_URL = `https://datavisualization-assignment.onrender.com/api/v1`;
export const BASE_URL = `http://localhost:5400/api/v1`;

export const items = [
  {
    text: "Total Sales Over Time",
    chartType: "sales-chart",
    isInterval: true,
  },
  {
    text: "Sales Growth Rate Over Time",
    chartType: "sales-growth-chart",
    isInterval: true,
  },
  {
    text: "New Customers Added Over Time",
    chartType: "new-customer-chart",
    isInterval: false,
  },
  {
    text: "Number of Repeat Customers",
    chartType: "repeat-customer-chart",
    isInterval: true,
  },
  {
    text: "Geographical Distribution of Customers",
    chartType: "map-chart",
    isInterval: false,
  },

  {
    text: "Customer Lifetime Value by Cohorts",
    chartType: "cohort-chart",
    isInterval: false,
  },
];

export const intervals = ["day", "month", "quarter", "year"];
