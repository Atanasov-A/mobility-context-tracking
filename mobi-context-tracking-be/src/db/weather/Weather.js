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
}

module.exports = Weather;
