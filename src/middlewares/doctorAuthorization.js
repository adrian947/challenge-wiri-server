const { getUserById } = require("../managers/user");
const { HttpStatusCode } = require("../utils/cosnt");
const decodedToken = require("../utils/decodeJWT");

const doctorAuthorization = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    const decode = decodedToken(token);

    req.user = await getUserById(decode.id);

    if (!req.adminUser || req.adminUser.role !== "doctor") {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ msg: "invalid token" });
    }

    return next();
  }
  return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "token not sent" });
};

module.exports = doctorAuthorization;
