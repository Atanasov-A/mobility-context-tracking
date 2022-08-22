import { GraphhoperLocation } from "../models/GraphhoperLocation";

export const parseGraphHopperLocationName = (location: GraphhoperLocation) => {
  let name = location.name;
  if (location.housenumber != null) {
    name += ` ${location.housenumber}`;
  }
  if (location.city != null) {
    name += ` ${location.city}`;
  }
  if (location.state != null) {
    name += ` ${location.state}`;
  }
  if (location.country != null) {
    name += ` ${location.country}`;
  }
  return name;
};
