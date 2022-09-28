import { TravelPurpseStatisticDto } from "./../../../models/dto/TravelPurposeStatisticDto";
import { TransportTypeEnum } from "./../../../models/enums/TransportTypeEnum";
import { WeatherCountDto } from "./../../../models/dto/WeatherCountDto";
import { TransportTypeUsageDto } from "../../../models/dto/TransportTypeStatisticDto";
import { TransportTypeUsageMonthDto } from "../../../models/dto/TransportTypeUsageMonthDto";
import { serverClient } from "../serverClient";

export const getOverallStatisticsTransportType = () => {
  return serverClient.get<TransportTypeUsageDto>(
    "/api/overall-statistics-transport-type"
  );
};

export const getOverallStatisticsTravelPurpose = () => {
  return serverClient.get<TravelPurpseStatisticDto>(
    "/api/overall-statistics-travel-purpose"
  );
};

export const getOverallStatisticsTransportTypeComparsionByMonth = (
  firstTransportType: TransportTypeEnum,
  secondTransportType: TransportTypeEnum
) => {
  return serverClient.get<TransportTypeUsageMonthDto>(
    `/api/overall-statistics-transport-type-comparision?firstTransportTypeName=${firstTransportType.toLowerCase()}&secondTransportTypeName=${secondTransportType.toLocaleLowerCase()}`
  );
};

export const getOverallStatisticsTransportTypeByWeather = (
  transportTypeName: TransportTypeEnum
) => {
  return serverClient.get<WeatherCountDto>(
    `/api/overall-statistics-transport-type-weather?transportTypeName=${transportTypeName.toLowerCase()}`
  );
};
