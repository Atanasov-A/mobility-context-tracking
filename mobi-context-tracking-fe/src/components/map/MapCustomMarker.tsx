import { LatLng } from "leaflet";
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";

interface Props {
  markerPointLocation?: GraphhoperLocationPoint;
  label?: string;
  markerName?: string;
}

const MapCustomMarker = (props: Props) => {
  const map = useMap();

  useEffect(() => {
    if (
      props.markerPointLocation != null &&
      props.markerPointLocation.lat != null &&
      props.markerPointLocation.lng != null
    )
      map.flyTo(
        new LatLng(props.markerPointLocation.lat, props.markerPointLocation.lng)
      );
  }, [props.markerPointLocation, map]);

  return (
    <>
      {props.markerPointLocation && (
        <Marker
          position={
            new LatLng(
              props.markerPointLocation.lat,
              props.markerPointLocation.lng
            )
          }
        >
          {props.label && props.markerName && (
            <Popup>{props.label + " " + props.markerName}</Popup>
          )}
        </Marker>
      )}
    </>
  );
};

export { MapCustomMarker };
