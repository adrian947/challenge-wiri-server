const { Router } = require("express");
const loginUser = require("../controllers/auth/loginUser");
const { loginValidation } = require("../validators/loginValidation");

const patientAuthorization = require("../middlewares/patientAuthorization");
const getMe = require("../controllers/auth/getMe");

const router = Router();
router.post("/login", loginValidation, loginUser);
router.get("/me", patientAuthorization, getMe);

module.exports = router;
