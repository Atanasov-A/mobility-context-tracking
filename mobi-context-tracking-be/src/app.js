const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

// routes
const router = require("./routes/router.js");
const authRouter = require("./routes/authRouter.js");
const mobilityActivityRouter = require("./routes/mobilityActivityRouter.js");
const { isLoggedIn } = require("./middleware/isLoggedIn.js");

const port = 3090;
var app = express();
require("dotenv").config();

// secure express app removing headers
app.use(helmet());

// parse application/json
app.use(bodyParser.json());

// set up port
const PORT = process.env.PORT || port;
app.use(express.json());
app.use(cors());

// add routes
app.use("/api", isLoggedIn, mobilityActivityRouter);
app.use("/", authRouter);

app.get("*", (req, res) => {
  res.send("not existing");
});

const options = {
  key: fs.readFileSync(__dirname + "/certificates/key.pem"),
  cert: fs.readFileSync(__dirname + "/certificates/cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
