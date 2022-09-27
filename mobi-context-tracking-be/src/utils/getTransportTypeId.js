const { transportTypeEnumList } = require("../models/enums/TransportTypeEnum");

// Return -1 if transport name doesn't exists
const getTransportTypeId = (transportName) => {
  const selectedTransportTypeIndex = transportTypeEnumList.findIndex(
    (tt) => tt === transportName
  );

  if (selectedTransportTypeIndex === -1) {
    return -1;
  }
  const selectedTransportTypeId = selectedTransportTypeIndex + 1;
  return selectedTransportTypeId;
};

module.exports = {
  getTransportTypeId,
};
