const jwt = require("jsonwebtoken");

const signJwtToken = (email) => {
  const token = jwt.sign(
    {
      email,
    },
    process.env.AUTH_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

const verifyJwtToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
  return decodedToken;
};

module.exports = {
  signJwtToken,
  verifyJwtToken,
};
