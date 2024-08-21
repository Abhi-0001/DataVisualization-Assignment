import styled from "styled-components";
import { intervals, items } from "../utils/constants";
import { useEffect, useState } from "react";

const StyledSelect = styled.select`
  width: fit-content;
  height: fit-content;
  border: #f7f7f7 1px solid;
  padding: 0.2rem 0.6rem;
`;

function SelectType({ chartName, setChart, setInterval, curInterval }) {
  const [activeItem, setActiveItem] = useState({});
  useEffect(
    function () {
      const curItem = items.find((item) => item.chartType === chartName);
      setActiveItem(curItem);
      setInterval("day");
    },
    [chartName]
  );

  function handleChartUpdate(e) {
    // console.log(e.target.selectedOptions[0].id);
    const activeChart = e.target.selectedOptions[0].id;
    setChart(activeChart);
  }
  function updateInterval(e) {
    setInterval(e.target.value);
  }
  return (
    <div>
      <StyledSelect onChange={handleChartUpdate}>
        {items.map((item, i) => (
          <option name={item.text} id={item.chartType} key={i}>
            {item.text}
          </option>
        ))}
      </StyledSelect>

      {activeItem.isInterval && (
        <StyledSelect onChange={updateInterval}>
          {intervals.map((item, i) => (
            <option key={i} id={i}>
              {item}
            </option>
          ))}
        </StyledSelect>
      )}
    </div>
  );
}

export default SelectType;
