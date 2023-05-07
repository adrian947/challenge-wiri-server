const { Router } = require("express");
const getTurns = require("../controllers/turns/getTurns");
const patientAuthorization = require("../middlewares/patientAuthorization");
const reserveTurns = require("../controllers/turns/reserveTurns");
const cancelTurns = require("../controllers/turns/cancelTurns");
const generateTurns = require("../controllers/turns/generateTurns");
const doctorAuthorization = require("../middlewares/doctorAuthorization");
const getTurnsForDoctor = require("../controllers/turns/getTurnsForDoctor");
const getDoctors = require("../controllers/turns/getDoctors");
const { turnReserveValidation } = require("../validators/turnValidation");
const { queryIdValidation } = require("../validators/queryIdValidation");

const router = Router();
router.get("/get_doctors", patientAuthorization, getDoctors);
router.get("/turns", patientAuthorization,queryIdValidation, getTurns);
router.post("/turns", patientAuthorization, turnReserveValidation, reserveTurns);
router.patch("/turns", patientAuthorization, turnReserveValidation, cancelTurns);
router.post("/turns-generate", doctorAuthorization, queryIdValidation, generateTurns);
router.get("/turns-doctor", doctorAuthorization, queryIdValidation, getTurnsForDoctor);

module.exports = router;
