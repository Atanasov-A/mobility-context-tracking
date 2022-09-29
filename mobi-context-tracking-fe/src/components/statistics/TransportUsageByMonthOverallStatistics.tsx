import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOverallStatisticsTransportTypeComparsionByMonth } from "../../api/server/statistics/overallStatistics";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import {
  getTransportTypeKeyByValue,
  TransportTypeEnum,
} from "../../models/enums/TransportTypeEnum";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomHorizontalBarChart } from "../charts/CustomHorizontalBarChart";
import { SelectDropdown } from "../shared/SelectDropdown";

const TransportUsageByMonthOverallStatistics = (props) => {
  const [firstDatasetValues, setFirstDatasetValues] = useState<number[]>([]);
  const [secondDatasetValues, setSecondDatasetValues] = useState<number[]>([]);
  const [firstDatasetName, setFirstDatasetName] = useState<string>();
  const [secondDatasetName, setSecondDatasetName] = useState<string>();
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedFirstTransportType, setSelectedFirstTransportType] =
    useState<string>(TransportTypeEnum.BIKE);
  const [selectedSecondTransportType, setSelectedSecondTransportType] =
    useState<string>(TransportTypeEnum.CAR);

  const firstTransporTypeValue = getTransportTypeKeyByValue(
    selectedFirstTransportType
  );
  const secondTransporTypeValue = getTransportTypeKeyByValue(
    selectedSecondTransportType
  );

  useEffect(() => {
    (async () => {
      const transportUsageObj = (
        await getOverallStatisticsTransportTypeComparsionByMonth(
          firstTransporTypeValue,
          secondTransporTypeValue
        )
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
      }
    })();
  }, [firstTransporTypeValue, secondTransporTypeValue]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">
          {`Monthly transport type usage comparison between
           ${TransportTypeEnum[firstTransporTypeValue]} and
           ${TransportTypeEnum[secondTransporTypeValue]}`}
        </Typography>
      </Stack>
      <Grid
        container
        spacing={0.5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2, px: 7 }}
      >
        <Grid item xs={12} md={6} sx={{ px: 1, m: 1 }}>
          <SelectDropdown
            label={`${LABEL_CONSTANTS.transportType}`}
            dropdownValues={Object.values(TransportTypeEnum)}
            selectedDropdownValue={selectedFirstTransportType}
            setSelectedDropdownValue={setSelectedFirstTransportType}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ px: 1, m: 1 }}>
          <SelectDropdown
            label={`${LABEL_CONSTANTS.transportType}`}
            dropdownValues={Object.values(TransportTypeEnum)}
            selectedDropdownValue={selectedSecondTransportType}
            setSelectedDropdownValue={setSelectedSecondTransportType}
          />
        </Grid>
      </Grid>

      <CustomHorizontalBarChart
        labels={labels}
        secondDatasetValues={secondDatasetValues}
        firstDatasetValues={firstDatasetValues}
        nameFirstDataset={TransportTypeEnum[firstTransporTypeValue]}
        nameSecondDataset={TransportTypeEnum[secondTransporTypeValue]}
      />
    </>
  );
};

export { TransportUsageByMonthOverallStatistics };
