const bcrypt = require("bcrypt");
const signToken = require("../../utils/signJWT");
const adminUserManager = require("../../managers/user");
const loginUserServices = require("../../services/loginUserServices");

const loginUser = async (req, res) => {
  try {
    await loginUserServices(req, res, {
      adminUserManager,
      bcrypt,
      signToken
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = loginUser;
