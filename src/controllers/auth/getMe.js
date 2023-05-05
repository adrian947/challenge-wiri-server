const getMeServices = require("../../services/getMeServices");
const adminUserManager = require("../../managers/user");
const signToken = require("../../utils/signJWT");

const getMe = async(req, res) => {
 getMeServices(req, res, {adminUserManager, signToken})
}

module.exports = getMe;