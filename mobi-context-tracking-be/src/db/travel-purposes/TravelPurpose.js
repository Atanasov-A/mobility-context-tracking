const dbConnection = require("../db");

const TRAVEL_PURPOSES_TABLE_NAME = "travel_purposes";

class TravelPurpose {
  constructor(
    id,
    job,
    education,
    business,
    shopping,
    leisure,
    accompanying,
    vacation
  ) {
    this.id = id;
    this.job = job;
    this.education = education;
    this.business = business;
    this.shopping = shopping;
    this.leisure = leisure;
    this.accompanying = accompanying;
    this.vacation = vacation;
  }

  static async saveTravelPurpose(travelPurposeList) {
    const parsedTravelPurposeList = travelPurposeList.map((tp) => `${tp}=1`);
    const parsedQueryString = parsedTravelPurposeList.join(",");

    const query = `INSERT INTO ${TRAVEL_PURPOSES_TABLE_NAME} SET ${parsedQueryString}, created_date=now();`;
    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = TravelPurpose;
