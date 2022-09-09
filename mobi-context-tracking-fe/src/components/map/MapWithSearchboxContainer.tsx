import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { GraphhoperLocation } from "../../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";
import { LocationSearchAutocomplete } from "../LocationSearchAutocomplete";
import { MapComponent } from "./MapComponent";
import { MapCustomMarker } from "./MapCustomMarker";
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
        <MapCustomMarker
          key={"start"}
          label={LABEL_CONSTANTS.startLocation}
          markerPointLocation={props.selectedValueStartingLocation?.point}
          markerName={props.selectedValueStartingLocation?.name}
        />
        <MapCustomMarker
          key={"end"}
          label={LABEL_CONSTANTS.endLocation}
          markerPointLocation={props.selectedValueEndLocation?.point}
          markerName={props.selectedValueEndLocation?.name}
        />

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
