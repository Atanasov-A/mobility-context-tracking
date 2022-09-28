import { TransportTypeByWeather } from "../statistics/TransportTypeByWeather";
import { TransportUsageByMonthOverallStatistics } from "../statistics/TransportUsageByMonthOverallStatistics";
import { TransportUsageOverallStatistics } from "../statistics/TransportUsageOverallStatistics";
import { TravelPurposeOverallStatistics } from "../statistics/TravelPurposeOverallStatistics";

const OverallStatiscticsPage = () => {
  return (
    <>
      <TransportUsageOverallStatistics />
      <TravelPurposeOverallStatistics />
      <TransportUsageByMonthOverallStatistics />
      <TransportTypeByWeather />
    </>
  );
};

export { OverallStatiscticsPage };
