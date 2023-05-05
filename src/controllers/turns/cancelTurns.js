const cancelTurnsServices = require("../../services/cancelTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");

const cancelTurns = async (req, res) => {
  try {
    cancelTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = cancelTurns;
