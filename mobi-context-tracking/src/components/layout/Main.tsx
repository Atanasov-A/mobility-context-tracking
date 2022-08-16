import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { LocationSearchAutocomplete } from "../LocationSearchAutocomplete";
import { MapComponent } from "../map/MapComponent";
import { GraphhoperLocation } from "../models/GraphhoperLocation";

// https://docs.graphhopper.com/#operation/getGeocode
// Search points
const Main = () => {
  const [selectedValueStartingLocation, setSelectedValueStartingLocation] =
    useState<GraphhoperLocation>();
  const [selectedValueEndLocation, setSelectedValueEndLocation] =
    useState<GraphhoperLocation>();

  return (
    <Box sx={{ flexGrow: 1, m: 1 }}>
      <LocationSearchAutocomplete
        label="Starting location"
        selectedValue={selectedValueStartingLocation}
        setSelectedValue={setSelectedValueStartingLocation}
      />
      <LocationSearchAutocomplete
        label="End location"
        selectedValue={selectedValueEndLocation}
        setSelectedValue={setSelectedValueEndLocation}
      />
      <MapComponent
        startingLocationMarker={selectedValueStartingLocation}
        endLocationMarker={selectedValueEndLocation}
      />
    </Box>
  );
};

export { Main };
