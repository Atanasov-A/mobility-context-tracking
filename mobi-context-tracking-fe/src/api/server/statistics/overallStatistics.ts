import { TransportTypeUsageDto } from "../../../models/TransportTypeStatisticDto";
import { serverClient } from "../serverClient";

export const getOverallStatisticsTransportType = () => {
  return serverClient.get<TransportTypeUsageDto>("/api/overall-statistics-tt");
};
