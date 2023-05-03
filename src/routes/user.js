const { Router } = require('express');
const loginUser = require("../controllers/auth/loginUser");
const { loginValidation } = require('../validators/loginValidation');

const router = Router();
router.post("/login", loginValidation,loginUser);

module.exports = router;
