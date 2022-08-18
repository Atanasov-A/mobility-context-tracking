import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { GraphhoperLocation } from "../models/GraphhoperLocation";
import { theme } from "../theme/CustomTheme";
import { MapCustomMarker } from "./MapCustomMarker";

interface Props {
  startingLocationMarker?: GraphhoperLocation;
  endLocationMarker?: GraphhoperLocation;
}

const mapComputerHeight = "800px";
const mapPhoneHeight = "450px";

const MapComponent = (props: Props) => {
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [mapHeight, setMapHeight] = useState(mapComputerHeight);

  useEffect(() => {
    if (matches) {
      setMapHeight(mapComputerHeight);
    } else {
      setMapHeight(mapPhoneHeight);
    }
  }, [matches]);

  return (
    <Box sx={{ height: mapHeight }}>
      <MapContainer
        center={[49.0, 8.4]}
        zoom={15}
        scrollWheelZoom={false}
        // style={{ height: "100vh", width: "100wh" }}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapCustomMarker
          key={"start"}
          markerLocation={props.startingLocationMarker}
        />
        <MapCustomMarker key={"end"} markerLocation={props.endLocationMarker} />
      </MapContainer>
    </Box>
  );
};

export { MapComponent };
