const express = require("express");
const mobilityActivityRouter = express.Router();
const { body, validationResult } = require("express-validator");
const {
  postValidateMobilityActivity,
} = require("../middleware/routes-validations/mobilityActivityValidatations");

mobilityActivityRouter.post(
  "/add-route",
  postValidateMobilityActivity,
  (req, res) => {
    console.log(req.body);
    return res.status(201).send();
  }
);

module.exports = mobilityActivityRouter;
