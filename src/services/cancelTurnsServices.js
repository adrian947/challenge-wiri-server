const { HttpStatusCode } = require("../utils/cosnt");

const cancelTurnsServices = async (req, res, { turnManager }) => {
  const { id_turn } = req.body;

  try {
    const turnUpdated = await turnManager.cancelTurn(id_turn);

    if (!turnUpdated) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "El turno no existe" });
    }
    
    res.status(HttpStatusCode.OK).json(turnUpdated);
  } catch (error) {
    throw error;
  }
};

module.exports = cancelTurnsServices;
