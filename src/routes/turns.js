const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientVerify = require("../middlewares/patientVerify");
const createTurns = require("../controllers/turns/createTurn");
const { turnCreateValidation } = require("../validators/turnValidation");

const router = Router();
router.get("/turns", patientVerify, getTurns);
router.post("/turns", patientVerify, turnCreateValidation, createTurns);

module.exports = router;
