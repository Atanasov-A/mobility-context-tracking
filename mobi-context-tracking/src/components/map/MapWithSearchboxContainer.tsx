import { LocationSearchAutocomplete } from "../LocationSearchAutocomplete";
import { GraphhoperLocation } from "../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";
import { MapComponent } from "./MapComponent";

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
}
const MapWithSearchboxContainer = (props: Props) => {
  return (
    <>
      <LocationSearchAutocomplete
        label="Starting location"
        selectedValue={props.selectedValueStartingLocation}
        setSelectedValue={props.setSelectedValueStartingLocation}
      />
      <LocationSearchAutocomplete
        label="End location"
        selectedValue={props.selectedValueEndLocation}
        setSelectedValue={props.setSelectedValueEndLocation}
      />
      <MapComponent
        startingLocationMarker={props.selectedValueStartingLocation}
        endLocationMarker={props.selectedValueEndLocation}
        setNewStartPointAfterMarkerDragged={
          props.setNewStartPointAfterMarkerDragged
        }
        setNewEndPointAfterMarkerDragged={
          props.setNewEndPointAfterMarkerDragged
        }
      />
    </>
  );
};

export { MapWithSearchboxContainer };
