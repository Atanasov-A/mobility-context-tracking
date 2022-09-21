const dbConnection = require("../db");

const MOBILITY_ACTIVITY_TYPE_TABLE_NAME = "mobility_activities";

class MobilityActivity {
  constructor(
    id,
    routeId,
    weatherId,
    travelPurposeId,
    transportTypeId,
    userId,
    startTime,
    endTime,
    reasonForTransport
  ) {
    this.id = id;
    this.routeId = routeId;
    this.weatherId = weatherId;
    this.travelPurposeId = travelPurposeId;
    this.transportTypeId = transportTypeId;
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.reasonForTransport = reasonForTransport;
  }

  static async saveMobilityActivity(newMobilityActivity) {
    const query = `INSERT INTO ${MOBILITY_ACTIVITY_TYPE_TABLE_NAME} SET 
    route_id=${newMobilityActivity.routeId},
    weather_id=${newMobilityActivity.weatherId},
    travel_purpose_id=${newMobilityActivity.travelPurposeId},
    transport_type_id=${newMobilityActivity.transportTypeId},
    user_id=${newMobilityActivity.userId},
    start_time='${newMobilityActivity.startTime}',
    end_time='${newMobilityActivity.endTime}',
    reason_for_transport_type='${newMobilityActivity.reasonForTransport}',
    created_date=now();`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = MobilityActivity;
