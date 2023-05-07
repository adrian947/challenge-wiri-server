const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientAuthorization = require("../middlewares/patientAuthorization");
const reserveTurns = require("../controllers/turns/reserveTurns");
const cancelTurns = require("../controllers/turns/cancelTurns");
const generateTurns = require("../controllers/turns/generateTurns");
const doctorAuthorization = require("../middlewares/doctorAuthorization");
const getTurnsForDoctor = require("../controllers/turns/getTurnsForDoctor");
const { turnReserveValidation } = require("../validators/turnValidation");

const router = Router();
router.get("/turns", patientAuthorization, getTurns);
router.post("/turns", patientAuthorization, turnReserveValidation, reserveTurns);
router.patch("/turns", patientAuthorization, turnReserveValidation, cancelTurns);
router.post("/turns-generate", doctorAuthorization, generateTurns);

router.get("/turns-doctor", doctorAuthorization, getTurnsForDoctor);

module.exports = router;
