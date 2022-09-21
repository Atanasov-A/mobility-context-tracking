const dbConnection = require("../db");

const USERS_TABLE_NAME = "users";
class User {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }

  static async getUser(userEmail) {
    const query = `SELECT * FROM ${USERS_TABLE_NAME} WHERE email="${userEmail}"`;

    return new Promise((resolve, reject) => {
      dbConnection.query(query, function (error, results, fields) {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = User;
