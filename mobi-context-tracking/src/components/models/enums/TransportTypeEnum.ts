export enum TransportTypeEnum {
  PUBLIC_TRANSPORT = "public transport",
  CAR_DRIVER = "car driver",
  CAR_PASSENGER = "car passenger",
  BIKE = "bike",
  WALKING = "walking",
  LONG_DITANCE_TRAIN = "long distance train",
}

export const getKeyByValue = (value: string) => {
  const indexOfValue = Object.values(TransportTypeEnum).indexOf(
    value as unknown as TransportTypeEnum
  );

  const key = Object.keys(TransportTypeEnum)[indexOfValue];

  return key;
};
