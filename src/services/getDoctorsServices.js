const { HttpStatusCode } = require("../utils/cosnt");

const getDoctorsServices = async (req, res, { adminUserManager }) => {
  try {
    const doctors = await adminUserManager.getAllDoctors();

    if (!doctors.length) {      
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("no hay doctores disponibles");
    }

    return res.status(HttpStatusCode.OK).json(doctors);
  } catch (error) {
    throw error;
  }
};

module.exports = getDoctorsServices;
