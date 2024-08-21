import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Spinner from "../ui/Spinner";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CohortChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function getCohorts() {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/customer/cohort`);
      const cohorts = res.data.data;

      let labels = [],
        values = [];
      if (Array.isArray(cohorts)) {
        labels = cohorts.map((item) => item.cohort);
        values = cohorts.map((item) => item.customerCount);
      } else return;

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Customer Lifetime Value (CLV)",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setIsLoading(false);
    }
    getCohorts();
  }, []);

  return <>{isLoading ? <Spinner /> : <Bar data={chartData} />}</>;
};

export default CohortChart;
