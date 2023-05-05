const { HttpStatusCode } = require("../utils/cosnt");

const cancelTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id_user, id_turn } = req.body;

  const turnUpdated = await turnManager.cancelTurn(id_turn);

  res.status(HttpStatusCode.OK).json(turnUpdated);
};

module.exports = cancelTurnsServices