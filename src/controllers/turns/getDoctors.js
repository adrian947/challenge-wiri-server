const adminUserManager = require("../../managers/user");
const getDoctorsServices = require("../../services/getDoctorsServices");
const { HttpStatusCode } = require("../../utils/cosnt");

const getDoctors = async (req, res) => {
  try {
   await getDoctorsServices(req, res, { adminUserManager });
  } catch (error) {
    res
    .status(HttpStatusCode.INTERNAL_SERVER)
    .json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = getDoctors;
