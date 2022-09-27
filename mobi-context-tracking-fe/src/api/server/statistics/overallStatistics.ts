import { WeatherCountDto } from "./../../../models/dto/WeatherCountDto";
import { TransportTypeUsageDto } from "../../../models/dto/TransportTypeStatisticDto";
import { TransportTypeUsageMonthDto } from "../../../models/dto/TransportTypeUsageMonthDto";
import { serverClient } from "../serverClient";

export const getOverallStatisticsTransportType = () => {
  return serverClient.get<TransportTypeUsageDto>(
    "/api/overall-statistics-transport-type"
  );
};

export const getOverallStatisticsTransportTypeComparsionByMonth = () => {
  return serverClient.get<TransportTypeUsageMonthDto>(
    "/api/overall-statistics-transport-type-comparision?firstTransportTypeName=car&secondTransportTypeName=bike"
  );
};

export const getOverallStatisticsTransportTypeByWeather = () => {
  return serverClient.get<WeatherCountDto>(
    "/api/overall-statistics-transport-type-weather?transportTypeName=bike"
  );
};
