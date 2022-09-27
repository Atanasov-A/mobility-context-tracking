import { TransportUsageByMonthOverallStatistics } from "../statistics/TransportUsageByMonthOverallStatistics";
import { TransportUsageOverallStatistics } from "../statistics/TransportUsageOverallStatistics";

const OverallStatiscticsPage = () => {
  return (
    <>
      <TransportUsageOverallStatistics />
      <TransportUsageByMonthOverallStatistics />
    </>
  );
};

export { OverallStatiscticsPage };
