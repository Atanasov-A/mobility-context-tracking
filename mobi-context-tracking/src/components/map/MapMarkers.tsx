import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { GraphhoperLocation } from "../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";

interface Props {
  graphhoperLocations: GraphhoperLocation[];
}

const MapMarker = (props: Props) => {
  //   const initialMarkers: LatLng[] = [new LatLng(51.505, -0.09)];
  const [markers, setMarkers] = useState<LatLng[]>([]);

  useEffect(() => {
    if (props.graphhoperLocations.length !== 0) {
      console.log(props.graphhoperLocations);
      const markers = props.graphhoperLocations.map((gl) => {
        return new LatLng(gl?.point?.lat, gl?.point?.lng);
      });
      setMarkers((prevValue) => [...prevValue, ...markers]);
    }

    // const newMarker = new LatLng(
    //   props.graphhoperLocations.point.lat,
    //   props.graphhoperLocations.point.lng
    // );
  }, [props.graphhoperLocations]);

  //   const map = useMapEvents({
  //     click(e) {
  //       markers.push(e.latlng);
  //       setMarkers((prevValue) => [...prevValue, e.latlng]);
  //     },
  //   });

  return (
    <>
      {markers.length !== 0 &&
        markers.map((marker, index) => (
          <Marker key={`marker-${index}`} position={marker}>
            {/* <Popup>
            <span>{props.graphhoperLocations.name}</span>
          </Popup> */}
          </Marker>
        ))}
    </>
  );
};

export { MapMarker };
