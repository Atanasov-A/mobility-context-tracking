import { TransportTypeByWeather } from "../statistics/TransportTypeByWeather";
import { TransportUsageByMonthOverallStatistics } from "../statistics/TransportUsageByMonthOverallStatistics";
import { TransportUsageOverallStatistics } from "../statistics/TransportUsageOverallStatistics";

const OverallStatiscticsPage = () => {
  return (
    <>
      <TransportUsageOverallStatistics />
      <TransportUsageByMonthOverallStatistics />
      <TransportTypeByWeather />
    </>
  );
};

export { OverallStatiscticsPage };
