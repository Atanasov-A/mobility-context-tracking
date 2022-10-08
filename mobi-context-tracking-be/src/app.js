const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

// routes
const authRouter = require("./routes/authRouter.js");
const mobilityActivityRouter = require("./routes/mobilityActivityRouter.js");
const { isLoggedIn } = require("./middleware/isLoggedIn.js");

const port = 3090;
var app = express();
require("dotenv").config();

// secure express app removing headers
app.use(helmet());
app.set("trust proxy", true);
app.options("*", cors());

// parse application/json
app.use(bodyParser.json());

// set up port
const PORT = process.env.PORT || port;
app.use(express.json());
app.use(cors());

// add routes
app.use("/api", authRouter);
app.use("/api/v1", isLoggedIn, mobilityActivityRouter);

app.get("/api/*", (req, res) => {
  res.send("not existing");
});

const frontendPath = path.join(
  __dirname,
  "..",
  "..",
  "mobi-context-tracking-fe/",
  "build"
);

app.use(express.static(frontendPath));

app.get("/*", function (req, res) {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const options = {
  key: fs.readFileSync(__dirname + "/certificates/key.pem"),
  cert: fs.readFileSync(__dirname + "/certificates/cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
