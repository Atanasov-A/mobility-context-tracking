import L from "leaflet";

export const createLeafletMarker = (
  markerLat: number,
  markerLon: number,
  popupText?: string
) => {
  const customMarker = L.marker([markerLat, markerLon]);
  if (popupText != null && popupText.trim() !== "") {
    const customMarkerPopup = L.popup().setContent(popupText);
    customMarker.bindPopup(customMarkerPopup);
  }

  return customMarker;
};
