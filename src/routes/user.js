const { Router } = require("express");
const loginUser = require("../controllers/auth/loginUser");
const { loginValidation } = require("../validators/loginValidation");
const getDoctors = require("../controllers/users/getDoctors");
const patientVerify = require("../middlewares/patientVerify");
const getMe = require("../controllers/auth/getMe");

const router = Router();
router.post("/login", loginValidation, loginUser);
router.get("/get_doctors", getDoctors);
router.get("/me", patientVerify ,getMe);

module.exports = router;
