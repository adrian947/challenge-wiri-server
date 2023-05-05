const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientVerify = require("../middlewares/patientVerify");
const createTurns = require("../controllers/turns/createTurn");
const cancelTurns = require("../controllers/turns/cancelTurns");
const { turnCreateValidation } = require("../validators/turnValidation");
const generateTurns = require("../controllers/turns/generateTurns");

const router = Router();
router.get("/turns", patientVerify, getTurns);
router.post("/turns", patientVerify, turnCreateValidation, createTurns);
router.patch("/turns", patientVerify, turnCreateValidation, cancelTurns);
router.post("/turns-generate", generateTurns);

module.exports = router;
