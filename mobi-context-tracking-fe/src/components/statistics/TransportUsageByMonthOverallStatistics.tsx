import { useEffect, useState } from "react";
import { getOverallStatisticsTransportTypeComparsionByMonth } from "../../api/server/statistics/overallStatistics";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomHorizontalBarChart } from "../charts/CustomHorizontalBarChart";

const TransportUsageByMonthOverallStatistics = (props) => {
  const [firstDatasetValues, setFirstDatasetValues] = useState<number[]>([]);
  const [secondDatasetValues, setSecondDatasetValues] = useState<number[]>([]);
  const [firstDatasetName, setFirstDatasetName] = useState<string>();
  const [secondDatasetName, setSecondDatasetName] = useState<string>();
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const transportUsageObj = (
        await getOverallStatisticsTransportTypeComparsionByMonth()
      ).data;

      if (transportUsageObj != null) {
        const labels = [];
        const dataset1Values = [];
        const dataset1Name =
          transportUsageObj.jsonObjectMonthUsageCount[0].transportTypes[0].name;
        const dataset2Name =
          transportUsageObj.jsonObjectMonthUsageCount[0].transportTypes[1].name;
        const dataset2Values = [];

        for (let transportObj of transportUsageObj.jsonObjectMonthUsageCount) {
          const formattedMonthName = transportObj.monthName.slice(0, 3);
          labels.push(formattedMonthName);
          const data1Value = transportObj.transportTypes[0].count;
          const data2Value = transportObj.transportTypes[1].count;
          dataset1Values.push(
            calculatePercentage(data1Value, transportUsageObj.totalCount)
          );
          dataset2Values.push(
            calculatePercentage(data2Value, transportUsageObj.totalCount)
          );
        }

        setLabels(labels);
        setFirstDatasetName(dataset1Name);
        setFirstDatasetValues(dataset1Values);
        setSecondDatasetName(dataset2Name);
        setSecondDatasetValues(dataset2Values);

        console.log("l", labels);
        console.log("d1n", dataset1Name);
        console.log("d2n", dataset2Name);
        console.log("d1", dataset1Values);
        console.log("d2", dataset2Values);
      }
    })();
  }, []);

  return (
    <>
      <CustomHorizontalBarChart
        title="Comparison bike and car usage by month"
        labels={labels}
        secondDatasetValues={secondDatasetValues}
        firstDatasetValues={firstDatasetValues}
        nameFirstDataset={firstDatasetName}
        nameSecondDataset={secondDatasetName}
      />
    </>
  );
};

export { TransportUsageByMonthOverallStatistics };
