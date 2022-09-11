import { Box } from "@mui/material";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { GraphhoperLocation } from "../../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";
import { LocationSearchAutocomplete } from "../LocationSearchAutocomplete";
import { MapComponent } from "./MapComponent";
import { MapRouting } from "./MapRouting";

interface Props {
  selectedValueStartingLocation: GraphhoperLocation;
  setSelectedValueStartingLocation: React.Dispatch<
    React.SetStateAction<GraphhoperLocation>
  >;
  selectedValueEndLocation: GraphhoperLocation;
  setSelectedValueEndLocation: React.Dispatch<
    React.SetStateAction<GraphhoperLocation>
  >;
  setNewStartPointAfterMarkerDragged: React.Dispatch<
    React.SetStateAction<GraphhoperLocationPoint>
  >;
  setNewEndPointAfterMarkerDragged: React.Dispatch<
    React.SetStateAction<GraphhoperLocationPoint>
  >;
  setSelectedValueStartingLocationNameAfterMarkerDragged: React.Dispatch<
    React.SetStateAction<string>
  >;
  setSelectedValueEndLocationNameAfterMarkerDragged: React.Dispatch<
    React.SetStateAction<string>
  >;
}
const MapWithSearchboxContainer = (props: Props) => {
  return (
    <>
      <Box>
        Please enter the location in the following format. A{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          city
        </Box>{" "}
        and a{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          street
        </Box>{" "}
        name.
      </Box>
      <Box>
        Example input:{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          Karlsruhe Moltkestr
        </Box>
      </Box>
      <LocationSearchAutocomplete
        label={LABEL_CONSTANTS.startLocation}
        selectedValue={props.selectedValueStartingLocation}
        setSelectedValue={props.setSelectedValueStartingLocation}
      />
      <LocationSearchAutocomplete
        label={LABEL_CONSTANTS.endLocation}
        selectedValue={props.selectedValueEndLocation}
        setSelectedValue={props.setSelectedValueEndLocation}
      />
      <MapComponent>
        {/* {!routeFound && (
          <MapCustomMarker
            key={"start"}
            label={LABEL_CONSTANTS.startLocation}
            markerPointLocation={props.selectedValueStartingLocation?.point}
            markerName={props.selectedValueStartingLocation?.name}
          />
        )}
        {!routeFound && (
          <MapCustomMarker
            key={"end"}
            label={LABEL_CONSTANTS.endLocation}
            markerPointLocation={props.selectedValueEndLocation?.point}
            markerName={props.selectedValueEndLocation?.name}
          />
        )} */}
        <MapRouting
          startPoint={props.selectedValueStartingLocation?.point}
          endPoint={props.selectedValueEndLocation?.point}
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
        />
      </MapComponent>
    </>
  );
};

export { MapWithSearchboxContainer };
