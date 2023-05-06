const { HttpStatusCode } = require("../utils/cosnt");

const getTurnsForDoctorServices = async (req, res, { turnManager }) => {
  const { id, start_date, end_date } = req.query;

  const query = {
    id_doctor: id,
    start_date,
    end_date,
  };

  const turnsList = await turnManager.getTurnsForDoctor(query);

  return res.status(HttpStatusCode.OK).json(turnsList);
};

module.exports = getTurnsForDoctorServices;
