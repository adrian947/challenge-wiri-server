const adminUserManager = require("../../managers/user");

const getDoctorsServices = require("../../services/getDoctorsServices");

const getDoctors = async (req, res) => {
  try {
    getDoctorsServices(req, res, { adminUserManager });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

module.exports = getDoctors;
