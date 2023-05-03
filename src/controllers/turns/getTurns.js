const getTurnsServices = require("../../services/getTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");

const getTurns = async (req, res) => {
  try {
    getTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = getTurns;
