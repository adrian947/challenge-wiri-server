const turnManager = require("../../managers/turn");
const createTurnsServices = require("../../services/createTurnServices");

const createTurns = async (req, res) => {
  try {
    createTurnsServices(req, res, { turnManager });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = createTurns;
