import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";

interface Props {
  startPoint?: GraphhoperLocationPoint;
  endPoint?: GraphhoperLocationPoint;
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

const MapRouting = (props: Props) => {
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
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: locationPoints,
      routeWhileDragging: true,
      lineOptions: {
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
    })
      .addTo(map)
      .on("waypointschanged", function (e) {
        props.setNewStartPointAfterMarkerDragged(
          e.waypoints[0].latLng as GraphhoperLocationPoint
        );
        props.setNewStartPointAfterMarkerDragged(
          e.waypoints[1].latLng as GraphhoperLocationPoint
        );
      })
      .on("routesfound", function (e) {
        const routeName = e.routes[0]?.name as string;
        const distanceInMeters = e.routes[0]?.summary?.totalDistance as number;
        const travelTimeInSeconds = e.routes[0]?.summary?.totalTime as number;

        const startLocationName = routeName?.split(",")[0] ?? "";
        props.setSelectedValueStartingLocationNameAfterMarkerDragged(
          startLocationName
        );
        const endLocationName = routeName?.split(",")[1] ?? "";
        props.setSelectedValueEndLocationNameAfterMarkerDragged(
          endLocationName
        );
      });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, locationPoints]);

  return null;
};

export { MapRouting };
