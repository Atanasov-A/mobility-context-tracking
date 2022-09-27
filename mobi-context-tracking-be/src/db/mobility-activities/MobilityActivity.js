const {
  transportTypeEnumList,
} = require("../../models/enums/TransportTypeEnum");
const {
  travelPurposeEnumList,
} = require("../../models/enums/TravelPurposeEnum");
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

  static async getSavedMobilityActivitiesCount() {
    const query = `SELECT COUNT(id) as totalCount from mobility_activities;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static async getTransportTypeCount(transportTypeName) {
    const selectedTransportTypeIndex = transportTypeEnumList.findIndex(
      (tt) => tt === transportTypeName
    );
    if (selectedTransportTypeIndex === -1) {
      throw new Error("Invalid transport type");
    }
    const selectedTransportTypeId = selectedTransportTypeIndex + 1;
    const query = `SELECT COUNT(id) as selectedTransportCount FROM mobility_activities 
    WHERE transport_type_id = ${selectedTransportTypeId};`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static getTravelPurposeCount(travelPurposeName) {
    const travelPurposeNameLowerCase = travelPurposeName.toLowerCase();
    const selectedTravelPurposeIndex = travelPurposeEnumList.findIndex(
      tp === travelPurposeNameLowerCase
    );
    if (selectedTravelPurposeIndex === -1) {
      throw new Error("Invalid travelPurpose type");
    }

    const query = `SELECT COUNT(*) as selectedTravelPurposeCount FROM mobility_activities ma 
    INNER JOIN travel_purposes tp ON ma.travel_purpose_id = tp.id
     WHERE tp.${travelPurposeNameLowerCase} = true`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static getTransportTypeCountByMonth(transportTypeName, monthNumber) {
    const selectedTransportTypeIndex = transportTypeEnumList.findIndex(
      (tt) => tt === transportTypeName
    );

    if (selectedTransportTypeIndex === -1) {
      throw new Error("Invalid transport type");
    }
    const selectedTransportTypeId = selectedTransportTypeIndex + 1;
    const query = `SELECT COUNT(id) as selectedTransportCount FROM mobility_activities 
    WHERE transport_type_id = ${selectedTransportTypeId} AND MONTH(start_time) = ${monthNumber};`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = MobilityActivity;
