const { HttpStatusCode } = require("../utils/cosnt");

const getDoctorsServices = async (req, res, { adminUserManager }) => {
  const doctors = await adminUserManager.getAllDoctors();

  res.status(HttpStatusCode.OK).json(doctors);
};

module.exports = getDoctorsServices;
