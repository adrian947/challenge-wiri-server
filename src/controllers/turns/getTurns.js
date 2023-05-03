const getTurnsServices = require("../../services/getTurnsServices");
const adminUserManager = require("../../managers/adminUser");

const getTurns = async (req, res) => {
  try {
    getTurnsServices(req, res, {adminUserManager});
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = getTurns;
