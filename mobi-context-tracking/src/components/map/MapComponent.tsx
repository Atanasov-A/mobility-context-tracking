import { Box } from "@mui/material";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { GraphhoperLocation } from "../models/GraphhoperLocation";
import { MapCustomMarker } from "./MapCustomMarker";
import { MapMarker } from "./MapMarkers";

interface Props {
  startingLocationMarker?: GraphhoperLocation;
  endLocationMarker?: GraphhoperLocation;
}

const MapComponent = (props: Props) => {

  return (
    <Box sx={{ height: 100 }}>
      <MapContainer
        center={[49.0, 8.4]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100wh" }}
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
