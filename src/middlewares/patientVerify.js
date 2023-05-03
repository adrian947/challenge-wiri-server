const { getUserById } = require("../managers/user");
const { HttpStatusCode } = require("../utils/cosnt");
const decodedToken = require("../utils/decodeJWT");

const patientVerify = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = decodedToken(token);
      req.user = await getUserById(decode.id);

      if (!req.user) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ msg: "invalid token" });
      }

      return next();
    } catch (error) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ msg: error.message });
    }
  }

  res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "token not sent" });
};

module.exports = patientVerify;
