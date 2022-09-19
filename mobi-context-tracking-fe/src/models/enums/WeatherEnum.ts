export enum WeatherEnum {
  SUNNY = "sunny",
  RAINY = "rainy",
  HOT = "hot",
  COLD = "cold",
  WINDY = "windy",
  SNOWY = "snowy",
  CLOUDY = "cloudy",
  STORMY = "stormy",
}

export const getWeatherKeyByValue = (value: string) => {
  const indexOfValue = Object.values(WeatherEnum).indexOf(
    value as unknown as WeatherEnum
  );

  const key = Object.keys(WeatherEnum)[indexOfValue] as WeatherEnum;

  return key;
};
