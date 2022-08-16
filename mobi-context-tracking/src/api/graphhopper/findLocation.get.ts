import { graphhopperClient, GRAPPHOPPER_API_PARAM } from "./graphhopperClient";

export const findLocationBySearchTerm = (searchTerm: string) => {
  return graphhopperClient.get(`?q=${searchTerm}&locale=de&${GRAPPHOPPER_API_PARAM}`);
};
