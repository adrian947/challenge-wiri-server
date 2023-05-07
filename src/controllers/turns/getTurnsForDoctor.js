const getTurnsForDoctorServices = require("../../services/getTurnsForDoctorServices");
const adminUserManager = require("../../managers/user");
const turnManager = require("../../managers/turn");
const { HttpStatusCode } = require("../../utils/cosnt");

const getTurnsForDoctor = async (req, res) => {
  try {
    await getTurnsForDoctorServices(req, res, {
      adminUserManager,
      turnManager,
    });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = getTurnsForDoctor;
