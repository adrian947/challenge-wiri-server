const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientAuthorization = require("../middlewares/patientAuthorization");
const createTurns = require("../controllers/turns/createTurn");
const cancelTurns = require("../controllers/turns/cancelTurns");
const generateTurns = require("../controllers/turns/generateTurns");
const doctorAuthorization = require("../middlewares/doctorAuthorization");
const getTurnsForDoctor = require("../controllers/turns/getTurnsForDoctor");
const { turnCreateValidation } = require("../validators/turnValidation");

const router = Router();
router.get("/turns", patientAuthorization, getTurns);
router.post("/turns", patientAuthorization, turnCreateValidation, createTurns);
router.patch("/turns", patientAuthorization, turnCreateValidation, cancelTurns);
router.post("/turns-generate", doctorAuthorization, generateTurns);

router.get("/turns-doctor", doctorAuthorization, getTurnsForDoctor);

module.exports = router;
