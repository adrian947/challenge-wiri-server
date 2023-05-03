const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientVerify = require("../middlewares/patientVerify");

const router = Router();
router.get("/turns", patientVerify, getTurns);

module.exports = router;
