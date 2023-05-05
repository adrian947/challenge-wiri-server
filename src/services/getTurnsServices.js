const moment = require("moment");
const { Op } = require("sequelize");

const getTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id } = req.query;  
  const user = await adminUserManager.getUserByPk(id);

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

  const turnsList = await turnManager.getTurns(type);

  res.status(200).json(turnsList);
};

module.exports = getTurnsServices;
