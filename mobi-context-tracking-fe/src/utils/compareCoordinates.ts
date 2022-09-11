import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";
import L from "leaflet";

const DISTANCE_METERS_MARGIN_ERROR = 50;

export const isSameLocation = (
  firstPoint: GraphhoperLocationPoint,
  secondPoint: GraphhoperLocationPoint | null
) => {
  if (secondPoint == null) {
    return true;
  }
  const firstPointLatLng = L.latLng(firstPoint.lat, firstPoint.lng);
  const secondPointLatLng = L.latLng(secondPoint.lat, secondPoint.lng);

  const distanceInMeters = firstPointLatLng.distanceTo(secondPointLatLng);
  return distanceInMeters <= DISTANCE_METERS_MARGIN_ERROR ? true : false;
};
