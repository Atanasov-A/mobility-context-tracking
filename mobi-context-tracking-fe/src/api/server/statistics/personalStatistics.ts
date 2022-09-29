import { PersonalStatisticObjectKeyUsageCountDto } from "../../../models/dto/PersonalStatisticObjectKeyUsageCountDto";
import { TransportTypeEnum } from "../../../models/enums/TransportTypeEnum";
import { serverClient } from "../serverClient";

export const getPersonalStatisticsTransportUsage = () => {
  return serverClient.get<PersonalStatisticObjectKeyUsageCountDto>(
    "/api/personal-statistics-transport-usage"
  );
};

export const getPersonalStatisticsTransportTypeByWeather = (
  transportTypeName: TransportTypeEnum
) => {
  return serverClient.get<PersonalStatisticObjectKeyUsageCountDto>(
    `/api/personal-statistics-transport-type-weather?transportTypeName=${transportTypeName.toLowerCase()}`
  );
};
