const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "mobi_tracking_db",
});

// Wait for database initialization
setTimeout(() => {
  connection.connect((e) => {
    if (e) {
      console.log("Db connection state:", connection.state);
    } else {
      console.log("Db connection state: ", connection.state);
    }
  });
}, 20000);

module.exports = connection;
