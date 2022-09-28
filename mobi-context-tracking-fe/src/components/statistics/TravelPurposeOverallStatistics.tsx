import { useEffect, useState } from "react";
import { getOverallStatisticsTravelPurpose } from "../../api/server/statistics/overallStatistics";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomPieChart } from "../charts/CustomPieChart";

const TravelPurposeOverallStatistics = () => {
  const [travelPurposeChartLabels, setTravelPurposeChartLabels] =
    useState<string[]>();
  const [travelPurposeChartValues, setTravelPurposeChartValues] =
    useState<string[]>();

  useEffect(() => {
    (async () => {
      const travelPurposeObj = (await getOverallStatisticsTravelPurpose()).data;
      if (travelPurposeObj != null) {
        const labels = [];
        const values = [];
        for (let tp of travelPurposeObj.travelPurposeCountObj) {
          labels.push(tp.name);
          values.push(
            calculatePercentage(tp.count, travelPurposeObj.totalCount)
          );
        }

        setTravelPurposeChartLabels(labels);
        setTravelPurposeChartValues(values);
      }
    })();
  }, []);

  return (
    <>
      <CustomPieChart
        title="Travel purpose in percentage"
        labels={travelPurposeChartLabels}
        values={travelPurposeChartValues}
      />
    </>
  );
};

export { TravelPurposeOverallStatistics };
