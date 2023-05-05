const cancelTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id_user, id_turn } = req.body;

  const turnUpdated = await turnManager.cancelTurn(id_turn);

  res.status(200).json(turnUpdated);
};

module.exports = cancelTurnsServices