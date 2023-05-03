const moment = require("moment");
const createTurnList = require("../utils/createTurnList");

const getTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id } = req.query;
  const user = await adminUserManager.getUserByPk(id);

  if (user.role !== "doctor") {
    res.status(400).json({ msg: "not a doctor" });
  }

  const days = createTurnList(user)

  const turnNotAvailableList = await turnManager.getTurns({
    startDate: moment().subtract(1, "day"),
    endDate: moment().add(1, "month"),
  });

  const turnAvailableList = days.filter((ef) => {
    return !turnNotAvailableList.some((e) => e.date === ef.available);
  });

  res.status(200).json(turnAvailableList);
};

module.exports = getTurnsServices;
