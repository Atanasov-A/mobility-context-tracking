import { useEffect } from "react";
import { getOverallStatisticsTransportTypeByWeather } from "../../api/server/statistics/overallStatistics";

const TransportTypeByWeather = () => {
  useEffect(() => {
    (async () => {
      const weatherObj = (await getOverallStatisticsTransportTypeByWeather())
        .data;

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
      }
    })();
  }, []);

  return <></>;
};
