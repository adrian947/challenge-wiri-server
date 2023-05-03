const jwt = require("jsonwebtoken");

const decodedToken = (token) => {
  const decode = jwt.verify(
    token,
    process.env.JSON_WEB_TOKEN_KEY,
    (error, decoded) => {
      if (error) {
        throw new Error("invalid token");
      }
      return decoded;
    }
  );
  return decode;
};

module.exports = decodedToken;
