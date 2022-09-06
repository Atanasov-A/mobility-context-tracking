import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { theme } from "../theme/CustomTheme";

interface Props {
  children?: React.ReactNode;
}

const mapComputerHeight = "700px";
const mapPhoneHeight = "450px";

const MapComponent = (props: Props) => {
  const isBiggerThanSmartphone = useMediaQuery(theme.breakpoints.up("sm"));
  const [mapHeight, setMapHeight] = useState(mapComputerHeight);

  useEffect(() => {
    if (isBiggerThanSmartphone) {
      setMapHeight(mapComputerHeight);
    } else {
      setMapHeight(mapPhoneHeight);
    }
  }, [isBiggerThanSmartphone]);

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
        {props.children}
      </MapContainer>
    </Box>
  );
};

export { MapComponent };
