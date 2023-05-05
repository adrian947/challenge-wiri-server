const generateTurnsServices = require("../../services/generateTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");
const { HttpStatusCode } = require("../../utils/cosnt");

const generateTurns = async (req, res) => {
  try {
    generateTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = generateTurns;
