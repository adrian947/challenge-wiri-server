const generateTurnsServices = require("../../services/generateTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");

const generateTurns = async (req, res) => {
  try {
    generateTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = generateTurns;
