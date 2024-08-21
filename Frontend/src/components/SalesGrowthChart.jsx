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
  },
};

function SalesGrowthChart({ interval }) {
  const [isLoading, setIsLoading] = useState(true);
  const [customizedData, setCustomizedData] = useState({});

  useEffect(
    function () {
      async function getSales() {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/sales/growth/${interval}`);
        const sales = res.data;

        const labels = sales.map((item) => {
          const date = new Date(item._id);
          const labelDate =
            String(date.getFullYear()) + "-" + String(date.getMonth());
          return labelDate;
        });
        const growthRates = sales.map((item) => item.growthRate);

        const tempData = {
          labels: labels, // Use a loop to generate labels based on `_id`
          datasets: [
            {
              label: "Total Sales",
              data: growthRates, // `totalSales` data
              borderColor: "rgba(75, 192, 192, 1)",
              yAxisID: "y-axis-1",
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

export default SalesGrowthChart;
