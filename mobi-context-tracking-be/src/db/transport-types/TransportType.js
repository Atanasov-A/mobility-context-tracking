const dbConnection = require("../db");

const TRANSPORT_TYPE_TABLE_NAME = "transport_types";

class TransportType {
  constructor(id, transportName) {
    this.id = id;
    this.transportName = transportName;
  }

  static async getTransportType(transportName) {
    const query = `SELECT * FROM ${TRANSPORT_TYPE_TABLE_NAME} WHERE transport_name="${transportName}"`;
    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = TransportType;
