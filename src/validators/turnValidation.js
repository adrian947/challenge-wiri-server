const { body, validationResult } = require("express-validator");

exports.turnCreateValidation = [
    body('date').isString().withMessage('Date must be string'),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('address').not().isEmpty().withMessage('Address is required'),
    body('id_doctor').isUUID().withMessage('Doctor ID must be a valid UUID'),
    body('id_patient').isUUID().withMessage('Patient ID must be a valid UUID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
