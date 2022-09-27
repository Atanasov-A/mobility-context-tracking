const { getTransportTypeId } = require("../../utils/getTransportTypeId");
const dbConnection = require("../db");

const WEATHER_TABLE_NAME = "weather";
class Weather {
  constructor(id, sunny, rainy, hot, cold, windy, snowy, cloudy, stormy) {
    this.id = id;
    this.sunny = sunny;
    this.rainy = rainy;
    this.hot = hot;
    this.cold = cold;
    this.windy = windy;
    this.snowy = snowy;
    this.cloudy = cloudy;
    this.stormy = stormy;
  }

  static async saveWeather(weatherList) {
    const parsedWeatherList = weatherList.map((w) => `${w}=1`);
    const parsedQueryString = parsedWeatherList.join(",");

    const query = `INSERT INTO ${WEATHER_TABLE_NAME} SET ${parsedQueryString}, created_date=now();`;
    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  static async getWeatherTotalCount(transportTypeName) {
    const transportId = getTransportTypeId(transportTypeName);
    if (transportId === -1) {
      throw new Error("Invalid transport type");
    }
    const query = `SELECT (tempTable.sunnyCount
      + tempTable.hotCount
      + tempTable.rainyCount
      + tempTable.stotmyCount
      + tempTable.windyCount
      + tempTable.coldCount
      + tempTable.cloudyCount
      + tempTable.snowyCount)
      as totalCount 
      FROM( SELECT IFNULL(SUM(sunny),0) as sunnyCount,
      IFNULL(SUM(rainy),0) as rainyCount,
      IFNULL(SUM(hot),0) as hotCount,
      IFNULL(SUM(stormy),0) as stotmyCount,
      IFNULL(SUM(windy),0) as windyCount,
      IFNULL(SUM(cold),0) as coldCount,
      IFNULL(SUM(cloudy),0) as cloudyCount,
      IFNULL(SUM(snowy),0) as snowyCount
      FROM mobility_activities ma
      INNER JOIN weather w ON w.ID = ma.weather_id
      where transport_type_id = ${transportId}) as tempTable;`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  static async getWeatherCountByWeather(transportTypeName) {
    const transportId = getTransportTypeId(transportTypeName);
    if (transportId === -1) {
      throw new Error("Invalid transport type");
    }
    const query = `SELECT
        IFNULL(SUM(sunny),0) as sunnyCount,
        IFNULL(SUM(rainy),0) as rainyCount,
        IFNULL(SUM(hot),0) as hotCount,
        IFNULL(SUM(stormy),0) as stotmyCount,
        IFNULL(SUM(windy),0) as windyCount,
        IFNULL(SUM(cold),0) as coldCount,
        IFNULL(SUM(cloudy),0) as cloudyCount,
        IFNULL(SUM(snowy),0) as snowyCount
        FROM mobility_activities ma
        INNER JOIN weather w ON w.ID = ma.weather_id
        WHERE transport_type_id = ${transportId};`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = Weather;
