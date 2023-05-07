const { body, validationResult } = require("express-validator");

exports.turnReserveValidation = [
  body("id_turn").isUUID().withMessage("Doctor ID must be a valid UUID"),
  body("id_patient").isUUID().withMessage("Patient ID must be a valid UUID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
