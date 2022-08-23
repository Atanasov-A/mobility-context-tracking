import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { GraphhoperLocation } from "../../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";
import { theme } from "../theme/CustomTheme";
import { MapCustomMarker } from "./MapCustomMarker";
import { MapRouting } from "./MapRouting";

interface Props {
  children?: React.ReactNode;
  // startingLocationMarker?: GraphhoperLocation;
  // endLocationMarker?: GraphhoperLocation;
  // setNewStartPointAfterMarkerDragged: React.Dispatch<
  //   React.SetStateAction<GraphhoperLocationPoint>
  // >;
  // setNewEndPointAfterMarkerDragged: React.Dispatch<
  //   React.SetStateAction<GraphhoperLocationPoint>
  // >;
  // setSelectedValueStartingLocationNameAfterMarkerDragged: React.Dispatch<
  //   React.SetStateAction<string>
  // >;
  // setSelectedValueEndLocationNameAfterMarkerDragged: React.Dispatch<
  //   React.SetStateAction<string>
  // >;
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

        {/* <MapCustomMarker
          key={"start"}
          label={"Start location:"}
          markerLocation={props.startingLocationMarker}
        />
        <MapCustomMarker
          key={"end"}
          markerLocation={props.endLocationMarker}
          label={"End location:"}
        />
        <MapRouting
          startPoint={props.startingLocationMarker?.point}
          endPoint={props.endLocationMarker?.point}
          setNewStartPointAfterMarkerDragged={
            props.setNewStartPointAfterMarkerDragged
          }
          setNewEndPointAfterMarkerDragged={
            props.setNewEndPointAfterMarkerDragged
          }
          setSelectedValueStartingLocationNameAfterMarkerDragged={
            props.setSelectedValueStartingLocationNameAfterMarkerDragged
          }
          setSelectedValueEndLocationNameAfterMarkerDragged={
            props.setSelectedValueEndLocationNameAfterMarkerDragged
          }
        /> */}
      </MapContainer>
    </Box>
  );
};

export { MapComponent };
