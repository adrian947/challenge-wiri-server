const bcrypt = require("bcrypt");
const signToken = require("../../utils/signJWT");
const adminUserManager = require("../../managers/user");
const loginUserServices = require("../../services/loginUserServices");
const { HttpStatusCode } = require("../../utils/cosnt");

const loginUser = async (req, res) => {
  try {
    await loginUserServices(req, res, {
      adminUserManager,
      bcrypt,
      signToken,
    });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = loginUser;
