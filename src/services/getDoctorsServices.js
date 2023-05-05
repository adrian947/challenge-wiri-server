const getDoctorsServices = async (req, res, { adminUserManager }) => {
  const doctors = await adminUserManager.getAllDoctors();

  res.status(200).json(doctors);
};

module.exports = getDoctorsServices;
