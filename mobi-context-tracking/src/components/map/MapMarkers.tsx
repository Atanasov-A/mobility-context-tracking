import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { GraphhoperLocation } from "../models/GraphhoperLocation";

interface Props {
  graphhoperLocations: GraphhoperLocation[];
}

const MapMarker = (props: Props) => {
  const [markers, setMarkers] = useState<LatLng[]>([]);

  useEffect(() => {
    if (props.graphhoperLocations.length !== 0) {
      console.log(props.graphhoperLocations);
      const markers = props.graphhoperLocations.map((gl) => {
        return new LatLng(gl?.point?.lat, gl?.point?.lng);
      });
      setMarkers((prevValue) => [...prevValue, ...markers]);
    }
  }, [props.graphhoperLocations]);

  return (
    <>
      {markers.length !== 0 &&
        markers.map((marker, index) => (
          <Marker key={`marker-${index}`} position={marker} />
        ))}
    </>
  );
};

export { MapMarker };
