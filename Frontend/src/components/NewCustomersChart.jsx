import { Bar } from "react-chartjs-2";
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

function NewCustomersChart({ interval }) {
  const [isLoading, setIsLoading] = useState(true);
  const [customizedData, setCustomizedData] = useState({});
  const [isDataExist, setIsDataExist] = useState(true);

  useEffect(
    function () {
      async function getSales() {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/customer/new`);
        const newCustomers = res.data;

        if (!newCustomers.data) {
          setIsDataExist(false);
          setIsLoading(false);
          return;
        }
        const labels = newCustomers.map((item) => {
          const date = new Date(item.created_at);
          const labelDate =
            String(date.getFullYear()) + "-" + String(date.getMonth());
          return labelDate;
        });

        const count = newCustomers.map((item) => item.count);

        const tempData = {
          labels: labels,
          datasets: [
            {
              label: "Total Sales",
              data: count, // `totalSales` data
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
      {isLoading && <Spinner />}
      {!isDataExist && <h2>No new customers</h2>}
      {!isLoading && isDataExist && <Bar data={chartData} />}
    </>
  );
}

export default NewCustomersChart;
