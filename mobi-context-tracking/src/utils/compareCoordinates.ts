import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";
import L from "leaflet";

export const isSameLocation = (
  firstPoint: GraphhoperLocationPoint,
  secondPoint: GraphhoperLocationPoint
) => {
  const firstPointLatLng = L.latLng(firstPoint.lat, firstPoint.lng);
  const secondPointLatLng = L.latLng(secondPoint.lat, secondPoint.lng);
  return firstPointLatLng.equals(secondPointLatLng);
};
