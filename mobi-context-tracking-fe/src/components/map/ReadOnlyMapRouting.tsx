import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";

interface Props {
  startPoint?: GraphhoperLocationPoint;
  endPoint?: GraphhoperLocationPoint;
}

const ReadOnlyMapRouting = (props: Props) => {
  const map = useMap();
  const [locationPoints, setLocationPoints] = useState<L.LatLng[]>();

  useEffect(() => {
    if (props.startPoint != null && props.endPoint != null) {
      const points = [
        L.latLng(props.startPoint.lat, props.startPoint.lng),
        L.latLng(props.endPoint.lat, props.endPoint.lng),
      ];
      setLocationPoints(points);
    }
  }, [props.startPoint, props.endPoint]);

  useEffect(() => {
    if (map == null) return;
    const routingControl = L.Routing.control({
      waypoints: locationPoints,
      waypointMode: "snap",
      lineOptions: {
        addWaypoints: false,
        styles: [
          {
            color: "blue",
            opacity: 0.7,
            weight: 7,
          },
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
    }).addTo(map);

    routingControl.hide();

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, locationPoints]);

  return null;
};

export { ReadOnlyMapRouting };
