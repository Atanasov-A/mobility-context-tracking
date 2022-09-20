const moment = require("moment");

const verifyDate = (dateValue) => {
  console.log("val", dateValue);
  const date = moment(dateValue);
  //   dateValue.format("DD-MM-YYYY hh:mm:ss");
  //   console.log(moment(dateValue, "DD-MM-YYYY hh:mm:ss"));
  console.log("convert", convertDateFromIsoString(dateValue));
  return moment(dateValue, true).isValid();
};

const convertDateFromIsoString = (date) => {
  //2022-09-20T00:06:00.000Z
  return moment(date, true).format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  verifyDate,
  convertDateFromIsoString,
};
