import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";

export function findDistanceBetweenTwoPointsInMeters(
  p1: GraphhoperLocationPoint,
  p2: GraphhoperLocationPoint
) {
  var R = 6371e3; // R is earth’s radius
  var lat1 = p1.lat; // starting point lat
  var lat2 = p2.lat; // ending point lat
  var lon1 = p1.lng; // starting point lon
  var lon2 = p2.lng; // ending point lon
  var lat1radians = toRadians(lat1);
  var lat2radians = toRadians(lat2);

  var latRadians = toRadians(lat2 - lat1);
  var lonRadians = toRadians(lon2 - lon1);

  var a =
    Math.sin(latRadians / 2) * Math.sin(latRadians / 2) +
    Math.cos(lat1radians) *
      Math.cos(lat2radians) *
      Math.sin(lonRadians / 2) *
      Math.sin(lonRadians / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distanceInMeters = R * c;

  return distanceInMeters;
}

function toRadians(val: number) {
  var PI = 3.1415926535;
  return (val / 180.0) * PI;
}
