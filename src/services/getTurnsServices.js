const moment = require("moment");
const createTurnList = require("../utils/createTurnList");
const turnManager = require("../managers/turn");
const { Op, Sequelize } = require("sequelize");

const getTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id } = req.query;
  const user = await adminUserManager.getUserByPk(id);
  console.log("🚀 ~ user:", user)

  // if (user.role !== "doctor") {
  //   res.status(400).json({ msg: "not a doctor" });
  // }

  // const days = createTurnList(user)
  // console.log("🚀 ~ days:", days)

  //TODO: como vamos a crear los turnos?
  // const createTuns = await turnManager.createTurns(days)
  let type = {};
  const now = moment().format("YYYY-MM-DD");
  if (user.role === "doctor") {
    type = {
      date: {
        [Op.gte]: now,
      },
      status: "available",
      id_doctor: user.id,
    };
  } else {
    type = {    
      status: "busy",
      id_patient: user.id,
    };
  }

  console.log("🚀 ~ type:", type);
  const turnsList = await turnManager.getTurns(type);

  // const turnNotAvailableList = await turnManager.getTurns({
  //   startDate: moment().subtract(1, "day"),
  //   endDate: moment().add(1, "month"),
  // });

  // const turnAvailableList = days.filter((ef) => {
  //   return !turnNotAvailableList.some((e) => e.date === ef.available);
  // });

  res.status(200).json(turnsList);
};

module.exports = getTurnsServices;
