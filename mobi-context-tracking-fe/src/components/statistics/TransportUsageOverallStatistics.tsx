import { useEffect, useState } from "react";
import { getOverallStatisticsTransportType } from "../../api/server/statistics/overallStatistics";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomPieChart } from "../charts/CustomPieChart";

const TransportUsageOverallStatistics = () => {
  const [transportUsageChartLabels, setTransportUsageChartLabels] =
    useState<string[]>();
  const [transportUsageChartValues, setTransportUsageChartValues] =
    useState<string[]>();

  useEffect(() => {
    (async () => {
      const transportUsageObj = (await getOverallStatisticsTransportType())
        .data;
      if (transportUsageObj != null) {
        const labels = [
          "car",
          "bike",
          "walking",
          "long distance train",
          "public transport",
        ];
        // !!! Labels should match values index
        const values = [
          calculatePercentage(
            transportUsageObj.carUsageCount,
            transportUsageObj.totalCount
          ),
          calculatePercentage(
            transportUsageObj.bikeUsageCount,
            transportUsageObj.totalCount
          ),

          calculatePercentage(
            transportUsageObj.walkingUsageCount,
            transportUsageObj.totalCount
          ),
          calculatePercentage(
            transportUsageObj.longDistanceTrainUsageCount,
            transportUsageObj.totalCount
          ),
          calculatePercentage(
            transportUsageObj.publicTransportUsageCount,
            transportUsageObj.totalCount
          ),
        ];

        setTransportUsageChartLabels(labels);
        setTransportUsageChartValues(values);
      }
    })();
  }, []);

  return (
    <>
      <CustomPieChart
        title="Transportation type usage in percentage"
        labels={transportUsageChartLabels}
        values={transportUsageChartValues}
      />
    </>
  );
};

export { TransportUsageOverallStatistics };
