//https://api.geoapify.com/v1/geocode/search?text=willy%20&format=json&apiKey=YOUR_API_KEY

import axios from "axios";

const GEOAPIFY_API_KEY_LOCATIONS =
  process.env.REACT_APP_GEOAPIFY_LOCATIONS_API_KEY ||
  "94b538c020ff4355a5e9c4197f983e2b";
const GEOAPIFY_API_KEY_ROUTING =
  process.env.REACT_APP_GEOAPIFY_ROUTING_API_KEY ||
  "d3abffc913ca4805bc24744bcb7e497e";

export const GEOAPIFY_API_PARAM_LOCATIONS = `apiKey=${GEOAPIFY_API_KEY_LOCATIONS}`;
export const GEOAPIFY_API_PARAM_ROUTING = `apiKey=${GEOAPIFY_API_KEY_ROUTING}`;

const geoapifyClient = axios.create({
  baseURL: `https://api.geoapify.com/v1`,
});

export { geoapifyClient };
