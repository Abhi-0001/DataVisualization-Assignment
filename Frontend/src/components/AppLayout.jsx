import styled from "styled-components";
import SelectType from "../ui/SelectType";
import Charts from "./Charts";
import { useState } from "react";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 2rem 4rem;
`;

const ChartBox = styled.div`
  max-width: 80rem;
`;

function AppLayout() {
  const [chartName, setChartName] = useState("sales-chart");
  const [dataInterval, setDataInterval] = useState("day");
  return (
    <Layout>
      <SelectType
        setChart={setChartName}
        chartName={chartName}
        setInterval={setDataInterval}
        curInterval={dataInterval}
      />
      <ChartBox>
        <Charts type={chartName} interval={dataInterval} />
      </ChartBox>
    </Layout>
  );
}

export default AppLayout;
