import CohortChart from "./CohortsChart";
import MapChart from "./MapChart";
import NewCustomersChart from "./NewCustomersChart";
import RepeatCustomersChart from "./RepeatCustomersChart";
import SalesChart from "./SalesChart";
import SalesGrowthChart from "./SalesGrowthChart";

function Charts({ type, interval = "" }) {
  switch (type) {
    case "sales-chart":
      return <SalesChart interval={interval} />;

    case "map-chart":
      return <MapChart />;

    case "sales-growth-chart":
      return <SalesGrowthChart interval={interval} />;

    case "new-customer-chart":
      return <NewCustomersChart />;

    case "repeat-customer-chart":
      return <RepeatCustomersChart interval={interval} />;
      break;
    case "cohort-chart":
      return <CohortChart />;
  }
}

export default Charts;
