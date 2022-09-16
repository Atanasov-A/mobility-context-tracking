// // The Leaflet map Object
// const map = L.map("my-map").setView(
//   [38.908838755401035, -77.02346458179596],
//   12
// );

// // calculate and display routing:
// // from 38.937165,-77.045590 (1920 Quincy Street Northwest, Washington, DC 20011, United States of America)
// const fromWaypoint = [38.937165, -77.04559]; // latutude, longitude
// const fromWaypointMarker = L.marker(fromWaypoint)
//   .addTo(map)
//   .bindPopup(
//     "1920 Quincy Street Northwest, Washington, DC 20011, United States of America"
//   );

// // to 38.881152,-76.990693 (1125 G Street Southeast, Washington, DC 20003, United States of America)
// const toWaypoint = [38.881152, -76.990693]; // latitude, longitude
// const toWaypointMarker = L.marker(toWaypoint)
//   .addTo(map)
//   .bindPopup(
//     "1125 G Street Southeast, Washington, DC 20003, United States of America"
//   );

// fetch(
//   `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(
//     ","
//   )}|${toWaypoint.join(",")}&mode=drive&apiKey=${myAPIKey}`
// )
//   .then((res) => res.json())
//   .then(
//     (result) => {
//       // Note! GeoJSON uses [longitude, latutude] format for coordinates
//       const routeLayer = L.geoJSON(result, {
//         style: (feature) => {
//           return {
//             color: "rgba(20, 137, 255, 0.7)",
//             weight: 5,
//           };
//         },
//       }).addTo(map);

//       map.removeLayer(routeLayer);
//     },
//     (error) => console.log(error)
//   );

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
