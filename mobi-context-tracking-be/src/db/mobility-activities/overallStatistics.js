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
    // return transportTypeStatisticsObject;
  } catch (e) {}
  // });
};

module.exports = {
  getOverallStatisticTransportType,
};
