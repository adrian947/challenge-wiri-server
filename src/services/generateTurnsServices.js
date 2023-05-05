const { HttpStatusCode } = require("../utils/cosnt");
const createTurnList = require("../utils/createTurnList");

const generateTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id } = req.query;

  const user = await adminUserManager.getUserByPk(id);
  const days = createTurnList(user);

  if (user.role !== "doctor") {
    res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "not a doctor" });
  }

  const createdTurns = await turnManager.createTurns(days);
  res.status(HttpStatusCode.OK).json(createdTurns);
};

module.exports = generateTurnsServices;
