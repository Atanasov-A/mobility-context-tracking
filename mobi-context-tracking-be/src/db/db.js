// https://webdeasy.de/en/complete-login-system-with-node-js-vue-js-restapi-jwt-part-1-2/#installation

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mobi_tracking_db",
  password: "password",
});

connection.connect();

module.exports = connection;
