import { Line } from "react-chartjs-2";
import Spinner from "../ui/Spinner";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    "y-axis-1": {
      type: "linear",
      position: "left",
    },
    "y-axis-2": {
      type: "linear",
      position: "right",
      grid: {
        drawOnChartArea: false, // Remove grid lines for this axis
      },
    },
  },
};

function SalesChart({ interval }) {
  const [isLoading, setIsLoading] = useState(true);
  const [customizedData, setCustomizedData] = useState({});

  useEffect(
    function () {
      async function getSales() {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/sales/${interval}`);
        const sales = res.data;

        const labels = sales.map((item) => {
          const date = new Date(item._id);
          const labelDate =
            String(date.getFullYear()) + "-" + String(date.getMonth());
          return labelDate;
        });
        const totalSales = sales.map((item) => item.totalSales);
        const count = sales.map((item) => item.count);

        const tempData = {
          labels: labels, // Use a loop to generate labels based on `_id`
          datasets: [
            {
              label: "Total Sales",
              data: totalSales, // `totalSales` data
              borderColor: "rgba(75, 192, 192, 1)",
              yAxisID: "y-axis-1",
            },
            {
              label: "Count",
              data: count, // `count` data
              borderColor: "rgba(255, 99, 132, 1)",
              yAxisID: "y-axis-2",
            },
          ],
        };
        setCustomizedData(tempData);

        setIsLoading(false);
      }
      getSales();
    },
    [interval]
  );

  const options = {
    scales: {
      "y-axis-1": {
        type: "linear",
        position: "left",
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false, // Remove grid lines for this axis
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Line data={customizedData} options={options} />
      )}
    </>
  );
}

export default SalesChart;
