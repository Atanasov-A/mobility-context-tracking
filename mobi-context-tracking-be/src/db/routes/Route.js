const dbConnection = require("../db");

const ROUTES_TABLE_NAME = "routes";

// SELECT ROUND(ST_Distance_Sphere(point(start_location_lon, start_location_lon),
// point(end_location_lon, end_location_lat))) as distanceInMeters FROM routes;

class Route {
  constructor(
    id,
    startLocationName,
    endLocationName,
    startLocationLat,
    startLocationLon,
    endLocationLat,
    endLocationLon
  ) {
    this.id = id;
    this.startLocationName = startLocationName;
    this.endLocationName = endLocationName;
    this.startLocationLat = +startLocationLat;
    this.startLocationLon = +startLocationLon;
    this.endLocationLat = +endLocationLat;
    this.endLocationLon = +endLocationLon;
  }

  static async saveRoute(newRoute) {
    const query = `INSERT INTO ${ROUTES_TABLE_NAME} (start_location_name, end_location_name,
         start_location_lat, start_location_lon, end_location_lat, end_location_lon, created_date)
     VALUES (?, ?, ?, ?, ?, ?, now())`;

    return new Promise((resolve, reject) => {
      dbConnection.query(
        query,
        [
          newRoute.startLocationName,
          newRoute.endLocationName,
          newRoute.startLocationLat,
          newRoute.startLocationLon,
          newRoute.endLocationLat,
          newRoute.endLocationLon,
        ],
        function (error, results, fields) {
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  }
}

module.exports = Route;
