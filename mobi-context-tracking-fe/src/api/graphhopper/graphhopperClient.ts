import axios from "axios";

const GRAPPHOPPER_API_KEY = "8904bf94-a9ac-4af4-8570-d1cb255d7bc5";
export const GRAPPHOPPER_API_PARAM = `key=${GRAPPHOPPER_API_KEY}`;

const graphhopperClient = axios.create({
  baseURL: `https://graphhopper.com/api/1/geocode`,
});

export { graphhopperClient };
