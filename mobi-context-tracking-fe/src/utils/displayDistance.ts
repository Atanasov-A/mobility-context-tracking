export const displayDistance = (totalDistanceInMeters: number) => {
  if (totalDistanceInMeters > 1000) {
    const distanceInKm = totalDistanceInMeters / 1000;
    return distanceInKm.toFixed(1) + "km";
  } else {
    return totalDistanceInMeters + "m";
  }
};
