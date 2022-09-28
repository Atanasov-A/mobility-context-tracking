const Weather = require("../weather/Weather");
const MobilityActivity = require("./MobilityActivity");

const getOverallStatisticTransportType = async () => {
  try {
    const carResults = await MobilityActivity.getTransportTypeCount("car");
    const carUsageCount = carResults[0].selectedTransportCount;
    const bikeResults = await MobilityActivity.getTransportTypeCount("bike");
    const bikeUsageCount = bikeResults[0].selectedTransportCount;
    const walkingResults = await MobilityActivity.getTransportTypeCount(
      "walking"
    );
    const longDistanceTrainResults =
      await MobilityActivity.getTransportTypeCount("long_distance_train");
    const publicTransportResults = await MobilityActivity.getTransportTypeCount(
      "public_transport"
    );
    const totalCountResults =
      await MobilityActivity.getSavedMobilityActivitiesCount();
    const totalCount = totalCountResults[0].totalCount;

    const walkingUsageCount = walkingResults[0].selectedTransportCount;

    const longDistanceTrainUsageCount =
      longDistanceTrainResults[0].selectedTransportCount;

    const publicTransportUsageCount =
      publicTransportResults[0].selectedTransportCount;

    const transportTypeStatisticsObject = {
      carUsageCount,
      bikeUsageCount,
      walkingUsageCount,
      longDistanceTrainUsageCount,
      publicTransportUsageCount,
      totalCount,
    };
    return transportTypeStatisticsObject;
  } catch (e) {}
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getOverallStatisticTransportTypeByMonth = async (
  firstTransportTypeName,
  secondTransportTypeName
) => {
  let tempJsonObject = {};
  const firstVehicleResults = await MobilityActivity.getTransportTypeCount(
    firstTransportTypeName
  );
  const carUsageCount = firstVehicleResults[0].selectedTransportCount;
  const secondVehicleResults = await MobilityActivity.getTransportTypeCount(
    secondTransportTypeName
  );
  const bikeUsageCount = secondVehicleResults[0].selectedTransportCount;

  const totalCount = carUsageCount + bikeUsageCount;
  const jsonObjectMonthUsageCount = await Promise.all(
    months.map(async (monthName, index) => {
      try {
        const monthIndexNumber = index + 1;
        const firstVehicleResults =
          await MobilityActivity.getTransportTypeCountByMonth(
            firstTransportTypeName,
            monthIndexNumber
          );
        const firstVehicleCount = firstVehicleResults[0].selectedTransportCount;

        const secondVehicleResults =
          await MobilityActivity.getTransportTypeCountByMonth(
            secondTransportTypeName,
            monthIndexNumber
          );
        const secondVehicleCount =
          secondVehicleResults[0].selectedTransportCount;

        return (tempJsonObject = {
          monthName,
          transportTypes: [
            { name: firstTransportTypeName, count: firstVehicleCount },
            { name: secondTransportTypeName, count: secondVehicleCount },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    })
  );

  return { jsonObjectMonthUsageCount, totalCount };
};

const getOverallStatisticWeatherTransportType = async (transportName) => {
  const weatherTotalCount = (
    await Weather.getWeatherTotalCount(transportName)
  )[0].totalCount;
  const weatherCount = (
    await Weather.getWeatherCountByWeather(transportName)
  )[0];
  const sunny = weatherCount.sunnyCount;
  const rainy = weatherCount.rainyCount;
  const hot = weatherCount.hotCount;
  const stormy = weatherCount.stotmyCount;
  const windy = weatherCount.windyCount;
  const cold = weatherCount.coldCount;
  const cloudy = weatherCount.cloudyCount;
  const snowy = weatherCount.snowyCount;
  return {
    sunny,
    rainy,
    hot,
    stormy,
    windy,
    cold,
    cloudy,
    snowy,
    weatherTotalCount,
  };
};

module.exports = {
  getOverallStatisticTransportType,
  getOverallStatisticTransportTypeByMonth,
  getOverallStatisticWeatherTransportType,
};
