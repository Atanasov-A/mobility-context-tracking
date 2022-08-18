import { useState } from "react";
import { LocationSearchAutocomplete } from "../LocationSearchAutocomplete";
import { MapComponent } from "../map/MapComponent";
import { GraphhoperLocation } from "../models/GraphhoperLocation";

const SearchLocationPage = () => {
  const [selectedValueStartingLocation, setSelectedValueStartingLocation] =
    useState<GraphhoperLocation>();
  const [selectedValueEndLocation, setSelectedValueEndLocation] =
    useState<GraphhoperLocation>();

  return (
    <>
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
    </>
  );
};

export { SearchLocationPage };
