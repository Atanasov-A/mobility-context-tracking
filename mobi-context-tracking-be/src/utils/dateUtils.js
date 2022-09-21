const moment = require("moment");

// inputDate - 2022-09-20T00:06:00.000Z
const verifyDate = (dateValue) => {
  const date = moment(dateValue);
  return moment(dateValue, true).isValid();
};

// inputDate - 2022-09-20T00:06:00.000Z
const convertDateFromIsoString = (date) => {
  return moment(date, true).format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  verifyDate,
  convertDateFromIsoString,
};
