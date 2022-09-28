import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOverallStatisticsTransportTypeByWeather } from "../../api/server/statistics/overallStatistics";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import {
  getTransportTypeKeyByValue,
  TransportTypeEnum,
} from "../../models/enums/TransportTypeEnum";
import { calculatePercentage } from "../../utils/calculatePercantage";
import { CustomRadarChart } from "../charts/CustomRadarChart";
import { SelectDropdown } from "../shared/SelectDropdown";

const TransportTypeByWeather = () => {
  const [labels, setLabels] = useState<string[]>();
  const [values, setValues] = useState<number[]>();
  const [selectedTransportType, setSelectedTransportType] = useState<string>(
    TransportTypeEnum.BIKE
  );
  const transporTypeValue = getTransportTypeKeyByValue(selectedTransportType);
  useEffect(() => {
    (async () => {
      const weatherObj = (
        await getOverallStatisticsTransportTypeByWeather(transporTypeValue)
      ).data;

      if (weatherObj != null) {
        // labels must match the data sequence
        const labels = [
          "sunny",
          "rainy",
          "hot",
          "stormy",
          "windy",
          "cold",
          "cloudy",
          "snowy",
        ];

        const values = [
          +calculatePercentage(weatherObj.sunny, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.rainy, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.hot, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.stormy, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.windy, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.cold, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.cloudy, weatherObj.weatherTotalCount),
          +calculatePercentage(weatherObj.snowy, weatherObj.weatherTotalCount),
        ];

        setLabels(labels);
        setValues(values);
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
          {`Impact of weather on ${TransportTypeEnum[transporTypeValue]} use`}
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
        label={TransportTypeEnum[transporTypeValue]}
        values={values}
        labels={labels}
      />
    </>
  );
};

export { TransportTypeByWeather };
