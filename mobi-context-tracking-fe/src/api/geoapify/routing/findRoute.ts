import {
  geoapifyClient,
  GEOAPIFY_API_PARAM_ROUTING,
} from "./../geoapifyClient";

// https://apidocs.geoapify.com/playground/routing
// https://api.geoapify.com/v1/routing?waypoints=38.937165,-77.04559|38.881152,-76.990693&mode=drive&apiKey=6dc7fb95a3b246cfa0f3bcef5ce9ed9a
export const findRoute = (
  startPointLat: number,
  startPointLon: number,
  endPointLat: number,
  endPointLon: number,
  mode: string
  // walk, drive, transit (public transport), bicycle, scooter
) => {
  return geoapifyClient.get(
    `/routing?waypoints=${startPointLat},${startPointLon}|${endPointLat},${endPointLon}&mode=${mode}&${GEOAPIFY_API_PARAM_ROUTING}`
  );
};
