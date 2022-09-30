const {
  transportTypeEnumList,
} = require("../../models/enums/TransportTypeEnum");
const {
  travelPurposeEnumList,
} = require("../../models/enums/TravelPurposeEnum");
const dbConnection = require("../db");

const User = require("../users/User");

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

  static getSavedMobilityActivitiesCount() {
    const query = `SELECT COUNT(id) as totalCount from mobility_activities;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static getTransportTypeCount(transportTypeName) {
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

  static getTravelPurposeTotalCount() {
    const query = `SELECT (tempTable.jobCount
      + tempTable.educationCount
      + tempTable.businessCount
      + tempTable.shoppingCount
      + tempTable.leisureCount
      + tempTable.accompanyingCount
      + tempTable.vacationCount)
      as totalCount
      FROM(SELECT
      IFNULL(SUM(job),0) as jobCount,
      IFNULL(SUM(education),0) as educationCount,
      IFNULL(SUM(business),0) as businessCount,
      IFNULL(SUM(shopping),0) as shoppingCount,
      IFNULL(SUM(leisure),0) as leisureCount,
      IFNULL(SUM(accompanying),0) as accompanyingCount,
      IFNULL(SUM(vacation),0) as vacationCount
      FROM mobility_activities ma
      INNER JOIN travel_purposes tp ON tp.id = ma.travel_purpose_id) as tempTable;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static getTravelPurposeCount() {
    const query = `SELECT
    IFNULL(SUM(job),0) as jobCount,
    IFNULL(SUM(education),0) as educationCount,
    IFNULL(SUM(business),0) as businessCount,
    IFNULL(SUM(shopping),0) as shoppingCount,
    IFNULL(SUM(leisure),0) as leisureCount,
    IFNULL(SUM(accompanying),0) as accompanyingCount,
    IFNULL(SUM(vacation),0) as vacationCount
    FROM mobility_activities ma
    INNER JOIN travel_purposes tp ON tp.id = ma.travel_purpose_id;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static getTravelPurposeCountByTravelPurposeName(travelPurposeName) {
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

  static async getTransportUsageTotalCount(userEmail) {
    let query = `SELECT SUM(tempTable.count) as totalCount FROM
    (SELECT COUNT(ma.transport_type_id) as count from mobility_activities ma 
    INNER JOIN transport_types t ON t.id = ma.transport_type_id) as tempTable;`;

    if (userEmail != null) {
      const userResults = await User.getUser(userEmail);

      if (userResults.length === 0) {
        throw new Error("user not found");
      }

      const userId = userResults[0].id;
      query = `SELECT SUM(tempTable.count) as totalCount 
      FROM (SELECT COUNT(ma.transport_type_id) as count from mobility_activities ma
      INNER JOIN transport_types t ON t.id = ma.transport_type_id 
      WHERE user_id = ${userId}) as tempTable;`;
    }

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static async getTransportUsageCount(userEmail) {
    let query = `SELECT t.id,t.transport_name, COUNT(ma.transport_type_id) as count 
    from transport_types t
    LEFT OUTER JOIN mobility_activities ma on t.id = ma.transport_type_id
    GROUP BY (id);`;

    if (userEmail != null) {
      const userResults = await User.getUser(userEmail);

      if (userResults.length === 0) {
        throw new Error("user not found");
      }
      const userId = userResults[0].id;
      query = `SELECT t.id,t.transport_name, COUNT(ma.transport_type_id) as count 
    from transport_types t
    LEFT OUTER JOIN mobility_activities ma on t.id = ma.transport_type_id
    WHERE user_id = ${userId} 
    GROUP BY (id);`;
    }

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = MobilityActivity;
