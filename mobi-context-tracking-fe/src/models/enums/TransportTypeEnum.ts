// https://www.bmvi.de/SharedDocs/DE/Publikationen/G/verkehr-in-zahlen-2021-2022-pdf.pdf?__blob=publicationFile
// Seite 215

// nichtmotorisiertem Verkehr - zu Fuß, Fahrrad
// motorisiertem Verkehr - ÖPNV
// Eisenbahnverkehr - Long distance train
// Motorisierter Individualverkehr - AUTO

export enum TransportTypeEnum {
  BIKE = "bike",
  WALKING = "walking",
  PUBLIC_TRANSPORT = "public transport",
  CAR = "car",
  LONG_DISTANCE_TRAIN = "long distance train",
}

export const getTransportTypeKeyByValue = (value: string) => {
  const indexOfValue = Object.values(TransportTypeEnum).indexOf(
    value as unknown as TransportTypeEnum
  );

  const key = Object.keys(TransportTypeEnum)[indexOfValue] as TransportTypeEnum;

  return key;
};
