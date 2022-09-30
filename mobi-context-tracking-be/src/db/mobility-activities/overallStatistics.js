const {
  transportTypeEnumList,
} = require("../../models/enums/TransportTypeEnum");
const {
  travelPurposeEnumList,
} = require("../../models/enums/TravelPurposeEnum");
const { weatherEnumList } = require("../../models/enums/WeatherEnum");
const Weather = require("../weather/Weather");
const MobilityActivity = require("./MobilityActivity");

const getOverallStatisticTransportType = async () => {
  try {
    const carResults = await MobilityActivity.getTransportTypeCount("car");
    const carUsageCount = carResults[0]?.selectedTransportCount ?? 0;
    const bikeResults = await MobilityActivity.getTransportTypeCount("bike");
    const bikeUsageCount = bikeResults[0]?.selectedTransportCount ?? 0;
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
    const totalCount = totalCountResults[0]?.totalCount ?? 0;

    const walkingUsageCount = walkingResults[0]?.selectedTransportCount ?? 0;

    const longDistanceTrainUsageCount =
      longDistanceTrainResults[0]?.selectedTransportCount ?? 0;

    const publicTransportUsageCount =
      publicTransportResults[0]?.selectedTransportCount ?? 0;

    const transportTypeStatisticsObject = {
      carUsageCount,
      bikeUsageCount,
      walkingUsageCount,
      longDistanceTrainUsageCount,
      publicTransportUsageCount,
      totalCount,
    };
    return transportTypeStatisticsObject;
  } catch (e) {
    throw e;
  }
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
  const carUsageCount = firstVehicleResults[0]?.selectedTransportCount ?? 0;
  const secondVehicleResults = await MobilityActivity.getTransportTypeCount(
    secondTransportTypeName
  );
  const bikeUsageCount = secondVehicleResults[0]?.selectedTransportCount ?? 0;

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
        const firstVehicleCount =
          firstVehicleResults[0]?.selectedTransportCount ?? 0;

        const secondVehicleResults =
          await MobilityActivity.getTransportTypeCountByMonth(
            secondTransportTypeName,
            monthIndexNumber
          );
        const secondVehicleCount =
          secondVehicleResults[0]?.selectedTransportCount ?? 0;

        return (tempJsonObject = {
          monthName,
          transportTypes: [
            { name: firstTransportTypeName, count: firstVehicleCount },
            { name: secondTransportTypeName, count: secondVehicleCount },
          ],
        });
      } catch (e) {
        throw e;
      }
    })
  );

  return { jsonObjectMonthUsageCount, totalCount };
};

const getOverallStatisticWeatherTransportType = async (transportName) => {
  const weatherTotalCount =
    (await Weather.getWeatherTotalCount(transportName))[0]?.totalCount ?? 0;
  const weatherCount = await Weather.getWeatherCountByWeather(transportName);
  const sunny = weatherCount[0]?.sunnyCount ?? 0;
  const rainy = weatherCount[0]?.rainyCount ?? 0;
  const hot = weatherCount[0]?.hotCount ?? 0;
  const stormy = weatherCount[0]?.stotmyCount ?? 0;
  const windy = weatherCount[0]?.windyCount ?? 0;
  const cold = weatherCount[0]?.coldCount ?? 0;
  const cloudy = weatherCount[0]?.cloudyCount ?? 0;
  const snowy = weatherCount[0]?.snowyCount ?? 0;
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

const getOverallStatisticTravelPurpose = async () => {
  const totalCount =
    (await MobilityActivity.getTravelPurposeTotalCount())[0]?.totalCount ?? 0;
  const results = await MobilityActivity.getTravelPurposeCount();

  const travelPurposeCountObj = [
    { name: travelPurposeEnumList[0], count: results[0]?.jobCount ?? 0 },
    { name: travelPurposeEnumList[1], count: results[0]?.educationCount ?? 0 },
    { name: travelPurposeEnumList[2], count: results[0]?.businessCount ?? 0 },
    { name: travelPurposeEnumList[3], count: results[0]?.shoppingCount ?? 0 },
    { name: travelPurposeEnumList[4], count: results[0]?.leisureCount ?? 0 },
    {
      name: travelPurposeEnumList[5],
      count: results[0]?.accompanyingCount ?? 0,
    },
    { name: travelPurposeEnumList[6], count: results[0]?.vacationCount ?? 0 },
  ];
  return { travelPurposeCountObj, totalCount };
};

const getPersonalStatisticsTransportUsage = async (userEmail) => {
  const personalTotalCount =
    (await MobilityActivity.getTransportUsageTotalCount(userEmail))[0]
      ?.totalCount ?? 0;
  const results = await MobilityActivity.getTransportUsageCount(userEmail);
  const personalStatisticObjectKeyUsageCount = [
    {
      name: results[0]?.transport_name ?? transportTypeEnumList[0],
      count: results[0]?.count ?? 0,
    },
    {
      name: results[1]?.transport_name ?? transportTypeEnumList[1],
      count: results[1]?.count ?? 0,
    },
    {
      name: results[2]?.transport_name ?? transportTypeEnumList[2],
      count: results[2]?.count ?? 0,
    },
    {
      name: results[3]?.transport_name ?? transportTypeEnumList[3],
      count: results[3]?.count ?? 0,
    },
    {
      name: results[4]?.transport_name ?? transportTypeEnumList[4],
      count: results[4]?.count ?? 0,
    },
  ];

  const overallTotalCount =
    (await MobilityActivity.getTransportUsageTotalCount())[0]?.totalCount ?? 0;

  const allUsersResults = await MobilityActivity.getTransportUsageCount();
  const overallStatisticObjectKeyUsageCount = [
    {
      name: allUsersResults[0]?.transport_name ?? transportTypeEnumList[0],
      count: allUsersResults[0]?.count ?? 0,
    },
    {
      name: allUsersResults[1]?.transport_name ?? transportTypeEnumList[1],
      count: allUsersResults[1]?.count ?? 0,
    },
    {
      name: allUsersResults[2]?.transport_name ?? transportTypeEnumList[2],
      count: allUsersResults[2]?.count ?? 0,
    },
    {
      name: allUsersResults[3]?.transport_name ?? transportTypeEnumList[3],
      count: allUsersResults[3]?.count ?? 0,
    },
    {
      name: allUsersResults[4]?.transport_name ?? transportTypeEnumList[4],
      count: allUsersResults[4]?.count ?? 0,
    },
  ];

  return {
    personalStatisticObjectKeyUsageCount,
    personalTotalCount,
    overallStatisticObjectKeyUsageCount,
    overallTotalCount,
  };
};

const getPersonalStatisticWeatherTransportType = async (
  transportName,
  userEmail
) => {
  const overallTotalCount =
    (await Weather.getWeatherTotalCount(transportName))[0]?.totalCount ?? 0;
  const overalWeatherResults = await Weather.getWeatherCountByWeather(
    transportName
  );

  const overallStatisticObjectKeyUsageCount = [
    {
      name: weatherEnumList[0],
      count: overalWeatherResults[0]?.sunnyCount ?? 0,
    },
    {
      name: weatherEnumList[1],
      count: overalWeatherResults[0]?.rainyCount ?? 0,
    },
    {
      name: weatherEnumList[2],
      count: overalWeatherResults[0]?.hotCount ?? 0,
    },
    {
      name: weatherEnumList[3],
      count: overalWeatherResults[0]?.coldCount ?? 0,
    },
    {
      name: weatherEnumList[4],
      count: overalWeatherResults[0]?.windyCount ?? 0,
    },
    {
      name: weatherEnumList[5],
      count: overalWeatherResults[0]?.snowyCount ?? 0,
    },
    {
      name: weatherEnumList[6],
      count: overalWeatherResults[0]?.cloudyCount ?? 0,
    },
    {
      name: weatherEnumList[7],
      count: overalWeatherResults[0]?.stormyCount ?? 0,
    },
  ];

  const personalTotalCount =
    (await Weather.getWeatherTotalCount(transportName, userEmail))[0]
      ?.totalCount ?? 0;
  const personalWeatherResults = await Weather.getWeatherCountByWeather(
    transportName,
    userEmail
  );

  const personalStatisticObjectKeyUsageCount = [
    {
      name: weatherEnumList[0],
      count: personalWeatherResults[0]?.sunnyCount ?? 0,
    },
    {
      name: weatherEnumList[1],
      count: personalWeatherResults[0]?.rainyCount ?? 0,
    },
    {
      name: weatherEnumList[2],
      count: personalWeatherResults[0]?.hotCount ?? 0,
    },
    {
      name: weatherEnumList[3],
      count: personalWeatherResults[0]?.coldCount ?? 0,
    },
    {
      name: weatherEnumList[4],
      count: personalWeatherResults[0]?.windyCount ?? 0,
    },
    {
      name: weatherEnumList[5],
      count: personalWeatherResults[0]?.snowyCount ?? 0,
    },
    {
      name: weatherEnumList[6],
      count: personalWeatherResults[0]?.cloudyCount ?? 0,
    },
    {
      name: weatherEnumList[7],
      count: personalWeatherResults[0]?.stormyCount ?? 0,
    },
  ];

  return {
    personalStatisticObjectKeyUsageCount,
    personalTotalCount,
    overallStatisticObjectKeyUsageCount,
    overallTotalCount,
  };
};

module.exports = {
  getOverallStatisticTransportType,
  getOverallStatisticTransportTypeByMonth,
  getOverallStatisticWeatherTransportType,
  getOverallStatisticTravelPurpose,
  getPersonalStatisticsTransportUsage,
  getPersonalStatisticWeatherTransportType,
};
