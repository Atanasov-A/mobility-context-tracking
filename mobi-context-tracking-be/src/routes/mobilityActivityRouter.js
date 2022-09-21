const express = require("express");
const jwt = require("jsonwebtoken");
const mobilityActivityRouter = express.Router();
const { body, validationResult } = require("express-validator");
const Route = require("../db/routes/Route");
const TransportType = require("../db/transport-types/TransportType");
const TravelPurpose = require("../db/travel-purposes/TravelPurpose");
const Weather = require("../db/weather/Weather");
const {
  postValidateMobilityActivity,
} = require("../middleware/routes-validations/mobilityActivityValidatations");
const User = require("../db/users/User");
const MobilityActivity = require("../db/mobility-activities/MobilityActivity");
const { convertDateFromIsoString } = require("../utils/dateUtils");

mobilityActivityRouter.post(
  "/add-mobility-activity",
  postValidateMobilityActivity,
  async (req, res) => {
    const authToken = req.headers.authorization.split(" ")[1];
    const startLocationName = req.body.startLocationName;
    const endLocationName = req.body.endLocationName;
    const startLocationPoint = req.body.startLocationPoint; // lat, lon
    const endLocationPoint = req.body.endLocationPoint;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const travelPurposeList = req.body.travelPurposeList;
    const weatherList = req.body.weatherList;
    const transportType = req.body.transportType;
    const reasonForTransport = req.body.reasonForTransport;

    const decodedToken = jwt.decode(authToken);
    const userEmail = decodedToken.email;

    try {
      const resultsRoute = await Route.saveRoute(
        new Route(
          null,
          startLocationName,
          endLocationName,
          startLocationPoint.lat,
          startLocationPoint.lon,
          endLocationPoint.lat,
          endLocationPoint.lon
        )
      );
      const routeId = resultsRoute.insertId;

      const resultsWeather = await Weather.saveWeather(weatherList);
      const weatherId = resultsWeather.insertId;

      const resultsTravelPurpose = await TravelPurpose.saveTravelPurpose(
        travelPurposeList
      );
      const travelPurposesId = resultsTravelPurpose.insertId;

      const resultsTransportType = await TransportType.getTransportType(
        transportType
      );
      const transportTypeObj = new TransportType(
        resultsTransportType[0].id,
        resultsTransportType[0].transport_name
      );

      const resultsUsers = await User.getUser(userEmail);
      const userObj = new User(resultsUsers[0].id, resultsUsers[0].email);

      const resultMobilityActivities =
        await MobilityActivity.saveMobilityActivity(
          new MobilityActivity(
            null,
            routeId,
            weatherId,
            travelPurposesId,
            transportTypeObj.id,
            userObj.id,
            convertDateFromIsoString(startDate),
            convertDateFromIsoString(endDate),
            reasonForTransport
          )
        );

      return res.status(201).send({
        dataRoute: resultsRoute,
        dataW: resultsWeather,
        dataT: resultsTravelPurpose,
        dataTransportType: resultsTransportType,
        obj: userObj,
        ma: resultMobilityActivities,
      });
    } catch (e) {
      console.error("ERROR:", e);
      return res.status(400).send();
    }
  }
);

module.exports = mobilityActivityRouter;
