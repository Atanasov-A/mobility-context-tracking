import L from "leaflet";

export const addRouteLayer = (route) => {
  const routeLayer = L.geoJSON(route, {
    style: (feature) => {
      return {
        color: "rgba(20, 137, 255, 0.7)",
        weight: 5,
      };
    },
  });
  return routeLayer;
};
