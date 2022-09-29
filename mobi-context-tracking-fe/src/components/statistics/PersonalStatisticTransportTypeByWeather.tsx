import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPersonalStatisticsTransportTypeByWeather } from "../../api/server/statistics/personalStatistics";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import {
  getTransportTypeKeyByValue,
  TransportTypeEnum,
} from "../../models/enums/TransportTypeEnum";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomRadarChart } from "../charts/CustomRadarChart";
import { SelectDropdown } from "../shared/SelectDropdown";

const PersonalStatisticTransporTypeByWeather = () => {
  const [labels, setLabels] = useState<string[]>();
  const [values, setValues] = useState<number[]>();
  const [secondValues, setSecondValues] = useState<number[]>();
  const [selectedTransportType, setSelectedTransportType] = useState<string>(
    TransportTypeEnum.BIKE
  );
  const transporTypeValue = getTransportTypeKeyByValue(selectedTransportType);
  useEffect(() => {
    (async () => {
      const weatherObj = (
        await getPersonalStatisticsTransportTypeByWeather(transporTypeValue)
      ).data;

      if (weatherObj != null) {
        // labels must match the data sequence
        const labels = [];
        const firstValues = [];
        const secondValues = [];

        for (let personalWeather of weatherObj.personalStatisticObjectKeyUsageCount) {
          labels.push(personalWeather.name);
          firstValues.push(
            +calculatePercentage(
              personalWeather.count,
              weatherObj.personalTotalCount
            )
          );
        }

        for (let overallWeather of weatherObj.overallStatisticObjectKeyUsageCount) {
          secondValues.push(
            +calculatePercentage(
              overallWeather.count,
              weatherObj.overallTotalCount
            )
          );
        }

        setLabels(labels);
        setValues(firstValues);
        setSecondValues(secondValues);
      }
    })();
  }, [transporTypeValue]);

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
          {`Impact of weather on ${TransportTypeEnum[transporTypeValue]} use: personal vs overall data`}
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
            label={LABEL_CONSTANTS.transportType}
            dropdownValues={Object.values(TransportTypeEnum)}
            selectedDropdownValue={selectedTransportType}
            setSelectedDropdownValue={setSelectedTransportType}
          />
        </Grid>
      </Grid>
      <CustomRadarChart
        label={`${TransportTypeEnum[transporTypeValue]}-personal`}
        values={values}
        secondValues={secondValues}
        labels={labels}
        secondLabel={`${TransportTypeEnum[transporTypeValue]}-overall`}
      />
    </>
  );
};

export { PersonalStatisticTransporTypeByWeather };
