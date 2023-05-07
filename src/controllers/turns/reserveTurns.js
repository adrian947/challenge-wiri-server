const turnManager = require("../../managers/turn");
const reserveTurnServices = require("../../services/reserveTurnServices");
const { HttpStatusCode } = require("../../utils/cosnt");

const reserveTurns = async (req, res) => {
  try {
    await reserveTurnServices(req, res, { turnManager });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = reserveTurns;
