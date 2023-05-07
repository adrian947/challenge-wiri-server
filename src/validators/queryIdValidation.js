const { query, validationResult } = require("express-validator");

exports.queryIdValidation = [
  query("id")
    .notEmpty().withMessage("UUID is required")
    .isUUID().withMessage("Invalid UUID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
