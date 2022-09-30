import L, { LatLng } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { findRoute } from "../../api/geoapify/routing/findRoute";
import { GeoapifyLocation } from "../../models/GeoapifyLocation";
import { addRouteLayer } from "../../utils/mapRouting";
import { createLeafletMarker } from "../../utils/mapUtils";

interface Props {
  startLocation: GeoapifyLocation;
  endLocation: GeoapifyLocation;
  setShowAlertNoRouteFound?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GeoapifyRouting = (props: Props) => {
  const map = useMap();

  const layerGroupRoutes = new L.LayerGroup();
  const layerGroupMarkers = new L.LayerGroup();

  useEffect(() => {
    if (
      props.startLocation != null &&
      props.endLocation != null &&
      map != null
    ) {
      map.eachLayer((layer) => {
        if (layer instanceof L.LayerGroup) {
          map.removeLayer(layer);
        }
      });

      const startLocationMarker = createLeafletMarker(
        props.startLocation.lat,
        props.startLocation.lon,
        `Start location: ${props.startLocation.formatted}`
      );
      const endLocationMarker = createLeafletMarker(
        props.endLocation.lat,
        props.endLocation.lon,
        `End location: ${props.endLocation.formatted}`
      );
      layerGroupMarkers.addLayer(startLocationMarker);
      layerGroupMarkers.addLayer(endLocationMarker);

      layerGroupMarkers.addTo(map);

      map.flyTo(new LatLng(props.startLocation.lat, props.startLocation.lon));

      findRoute(
        props.startLocation.lat,
        props.startLocation.lon,
        props.endLocation.lat,
        props.endLocation.lon,
        "drive"
      )
        .then((result) => {
          const route = result.data.features[0];
          const routeLayer = addRouteLayer(route);

          layerGroupRoutes.addLayer(routeLayer);
          layerGroupRoutes.addTo(map);
          if (props.setShowAlertNoRouteFound != null) {
            props.setShowAlertNoRouteFound(false);
          }
        })
        .catch((error) => {
          if (props.setShowAlertNoRouteFound != null) {
            props.setShowAlertNoRouteFound(true);
          }
        });
    }
  }, [map, props]);

  return <></>;
};
