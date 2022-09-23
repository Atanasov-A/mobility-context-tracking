const jwt = require("jsonwebtoken");
const { verifyJwtToken } = require("../utils/tokenUtils");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verifyJwtToken(token);

    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Your session is not valid!",
    });
  }
};
module.exports = {
  isLoggedIn,
};
