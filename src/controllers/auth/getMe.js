const getMeServices = require("../../services/getMeServices");
const adminUserManager = require("../../managers/user");
const signToken = require("../../utils/signJWT");
const { HttpStatusCode } = require("../../utils/cosnt");

const getMe = async (req, res) => {
  try {
    getMeServices(req, res, { adminUserManager, signToken });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = getMe;
