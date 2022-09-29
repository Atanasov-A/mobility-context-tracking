import { useEffect, useState } from "react";
import { getPersonalStatisticsTransportUsage } from "../../api/server/statistics/personalStatistics";
import { TransportTypeEnum } from "../../models/enums/TransportTypeEnum";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomHorizontalBarChart } from "../charts/CustomHorizontalBarChart";

const PersonalStatisticTransportUsage = (props) => {
  const [firstDatasetValues, setFirstDatasetValues] = useState<number[]>([]);
  const [secondDatasetValues, setSecondDatasetValues] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const dataset1Name = "personal usage";
  const dataset2Name = "overall usage";

  useEffect(() => {
    (async () => {
      const statisticObj = (await getPersonalStatisticsTransportUsage()).data;

      if (statisticObj != null) {
        const labels = [];
        const dataset1Values = [];

        const dataset2Values = [];

        for (let personal of statisticObj.personalStatisticObjectKeyUsageCount) {
          const userFriendlyLabels =
            TransportTypeEnum[personal.name.toUpperCase()];
          labels.push(userFriendlyLabels);
          const data1Value = personal.count;
          dataset1Values.push(
            calculatePercentage(data1Value, statisticObj.personalTotalCount)
          );
        }

        for (let overall of statisticObj.overallStatisticObjectKeyUsageCount) {
          const data2Value = overall.count;

          dataset2Values.push(
            calculatePercentage(data2Value, statisticObj.overallTotalCount)
          );
        }

        setLabels(labels);
        setFirstDatasetValues(dataset1Values);
        setSecondDatasetValues(dataset2Values);
      }
    })();
  }, []);

  return (
    <>
      <CustomHorizontalBarChart
        title={"Usage of transport comparison: personal vs overall data"}
        labels={labels}
        secondDatasetValues={secondDatasetValues}
        firstDatasetValues={firstDatasetValues}
        nameFirstDataset={dataset1Name}
        nameSecondDataset={dataset2Name}
      />
    </>
  );
};

export { PersonalStatisticTransportUsage };
