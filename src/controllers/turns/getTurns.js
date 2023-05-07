const getTurnsServices = require("../../services/getTurnsServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");
const { HttpStatusCode } = require("../../utils/cosnt");

const getTurns = async (req, res) => {
  try {
    await getTurnsServices(req, res, { adminUserManager, turnManager });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = getTurns;
