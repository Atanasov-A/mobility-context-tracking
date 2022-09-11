
const jwt = require("jsonwebtoken");
const {verifyJwtToken} = require("../utils/tokenUtils");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    const decodedToken = verifyJwtToken(token);

    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Your session is not valid!",
      err: err,
    });
  }
};
module.exports = {
  isLoggedIn,
};
