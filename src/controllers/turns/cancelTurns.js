const cancelTurnsServices = require("../../services/cancelTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");
const { HttpStatusCode } = require("../../utils/cosnt");

const cancelTurns = async (req, res) => {
  try {
    await cancelTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = cancelTurns;
