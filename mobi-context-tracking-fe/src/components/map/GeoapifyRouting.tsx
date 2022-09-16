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
}

export const GeoapifyRouting = (props: Props) => {
  const map = useMap();

  // https://stackoverflow.com/questions/53154473/leaflet-remove-geojson-layers
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
        "transit"
      )
        .then((result) => {
          const route = result.data.features[0];
          const routeLayer = addRouteLayer(route);

          layerGroupRoutes.addLayer(routeLayer);
          layerGroupRoutes.addTo(map);
        })
        .catch((error) => {});
    }
  }, [map, props]);

  return <></>;
};
