import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React from "react";
// import { colorScale, countries, missingCountries } from "./Countries";
import Spinner from "../ui/Spinner";

function MapChart() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    async function getLocations() {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/customer/geo-location`);
      const locs = res.data.data;
      console.log(locs);
      setLocations(locs);
      setIsLoading(false);
    }
    getLocations();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div style={{ margin: "auto", width: "700px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "700px",
          height: "600px",
        }}
        // backgroundColor="#282c34"

        series={{
          regions: [
            {
              scale: colorScale,
              values: countries,
              min: 0,
              max: 100,
            },
          ],
        }}
        onRegionTipShow={function reginalTip(event, label, code) {
          return label.html(`
                  <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
                    <p>
                    <b>
                    ${label.html()}
                    </b>
                    </p>
                    <p>
                    ${countries[code]}
                    </p>
                    </div>`);
        }}
        onMarkerTipShow={function markerTip(event, label, code) {
          return label.html(`
                  <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black !important; padding-left: 10px>
                    <p style="color: black !important;">
                    <b>
                    ${label.html()}
                    </b>
                    </p>
                    </div>`);
        }}
      />
    </div>
  );
}

export default MapChart;
