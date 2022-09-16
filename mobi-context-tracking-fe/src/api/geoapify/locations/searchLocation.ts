//https://api.geoapify.com/v1/geocode/search?text=willy%20&format=json&apiKey=YOUR_API_KEY

import {
  geoapifyClient,
  GEOAPIFY_API_PARAM_LOCATIONS,
} from "../geoapifyClient";

export const searchLocation = (searchTerm: string) => {
  return geoapifyClient.get(
    `/geocode/search?text=${searchTerm}&filter=countrycode:de,at,ch&format=json&${GEOAPIFY_API_PARAM_LOCATIONS}`
  );
};
