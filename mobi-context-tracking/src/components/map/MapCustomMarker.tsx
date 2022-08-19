import { LatLng } from "leaflet";
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { GraphhoperLocation } from "../models/GraphhoperLocation";

interface Props {
  markerLocation?: GraphhoperLocation;
  label?: string;
}

const MapCustomMarker = (props: Props) => {
  const map = useMap();

  useEffect(() => {
    if (
      props.markerLocation != null &&
      props.markerLocation.point != null &&
      props.markerLocation.point.lat != null &&
      props.markerLocation.point.lng != null
    )
      map.flyTo(
        new LatLng(
          props.markerLocation.point.lat,
          props.markerLocation.point.lng
        )
      );
  }, [props.markerLocation, map]);

  return (
    <>
      {props.markerLocation && (
        <Marker
          position={
            new LatLng(
              props.markerLocation.point.lat,
              props.markerLocation.point.lng
            )
          }
        >
          <Popup>{props.label + " " + props.markerLocation.name}</Popup>
        </Marker>
      )}
    </>
  );
};

export { MapCustomMarker };
