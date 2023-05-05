const turnManager = require("../../managers/turn");
const createTurnsServices = require("../../services/createTurnServices");
const { HttpStatusCode } = require("../../utils/cosnt");

const createTurns = async (req, res) => {
  try {
    createTurnsServices(req, res, { turnManager });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = createTurns;
