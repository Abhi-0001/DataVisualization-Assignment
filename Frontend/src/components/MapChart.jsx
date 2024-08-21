import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { BASE_URL } from "../utils/constants";
import Spinner from "../ui/Spinner";

const geoUrl = "/map.json";

// const geoUrl =
// "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

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

  if (isLoading) return <Spinner />;
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {locations.map((loc, idx) => (
        <Marker key={idx} coordinates={[loc.longitude, loc.latitude]}>
          <circle r={5} fill="#F53" />
        </Marker>
      ))}
    </ComposableMap>
  );
}

export default MapChart;
