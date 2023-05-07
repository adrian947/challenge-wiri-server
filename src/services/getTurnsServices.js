const moment = require("moment");
const { Op } = require("sequelize");
const { HttpStatusCode } = require("../utils/cosnt");

const getTurnsServices = async (
  req,
  res,
  { adminUserManager, turnManager }
) => {
  const { id } = req.query;
  try {
    const user = await adminUserManager.getUserByPk(id);

    let query = {};
    const now = moment().format("YYYY-MM-DD");
    if (user.role === "doctor") {
      query = {
        date: {
          [Op.gte]: now,
        },
        status: "available",
        id_doctor: user.id,
      };
    } else {
      query = {
        status: "busy",
        id_patient: user.id,
      };
    }

    const turnsList = await turnManager.getTurnsForPatient(query);

    res.status(HttpStatusCode.OK).json(turnsList);
  } catch (error) {
    throw error;
  }
};

module.exports = getTurnsServices;
