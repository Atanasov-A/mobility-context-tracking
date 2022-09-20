const { body, validationResult } = require("express-validator");
const {
  transportTypeEnumList,
} = require("../../models/enums/TransportTypeEnum");
const {
  travelPurposeEnumList,
} = require("../../models/enums/TravelPurposeEnum");
const { weatherEnumList } = require("../../models/enums/WeatherEnum");
const { verifyDate } = require("../../utils/dateUtils");
const {
  isLatitude,
  isLongitude,
} = require("../../utils/locationValidationUtils");

const postValidateMobilityActivity = [
  body("startLocationName")
    .exists()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      "Start location should not be empty and should be no more than 255 character long"
    ),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("endLocationName")
    .exists()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      "End location should not be empty and should be no more than 255 character long"
    ),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("startDate")
    .exists()
    .trim()
    .custom((value) => {
      const isDateValid = verifyDate(value);
      if (!isDateValid) {
        throw new Error("Invalid date");
      }
      return true;
    })
    .withMessage("Invalid start date"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("endDate")
    .exists()
    .trim()
    .custom((value) => {
      const isDateValid = verifyDate(value);
      if (!isDateValid) {
        throw new Error("Invalid date");
      }
      return true;
    })
    .withMessage("Invalid end date"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("reasonForTransport")
    .exists()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Reason for choosing this transport should not be empty."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("weatherList")
    .exists()
    .isArray({ min: 1 })
    .withMessage("Weather list should not be empty")
    .custom((values) => {
      const isDataValid = values.every((v) =>
        weatherEnumList.includes(v.toLowerCase())
      );
      if (!isDataValid) {
        throw new Error("Invalid element in the weather list");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("travelPurposeList")
    .exists()
    .isArray({ min: 1 })
    .custom((values) => {
      const isDataValid = values.every((v) =>
        travelPurposeEnumList.includes(v.toLowerCase())
      );
      if (!isDataValid) {
        throw new Error("Invalid element in the purposes list");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })
    .withMessage(
      "Travel purpose list should not be empty or it contains invalid data."
    ),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("transportType")
    .exists()
    .custom((value) => {
      const isDataValid = transportTypeEnumList.includes(value.toLowerCase());

      if (!isDataValid) {
        throw new Error("Invalid transport type");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })
    .withMessage("Transport type doesn't exist or it's invalid."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("startLocationPoint")
    .exists()
    .isObject()
    .custom((value) => {
      if (
        value.lat == null ||
        value.lon == null ||
        !isLatitude(+value.lat) ||
        !isLongitude(+value.lon)
      ) {
        throw new Error("Invalid location point");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })
    .withMessage("Start location point doesn't exist or it's invalid."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
  body("endLocationPoint")
    .exists()
    .isObject()
    .custom((value) => {
      if (
        value.lat == null ||
        value.lon == null ||
        !isLatitude(+value.lat) ||
        !isLongitude(+value.lon)
      ) {
        throw new Error("Invalid location point");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })
    .withMessage("End location point doesn't exist or it's invalid."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  postValidateMobilityActivity,
};
