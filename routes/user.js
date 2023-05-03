const { Router } = require('express');
const loginUser = require("../controllers/auth/loginUser");

const router = Router();
router.post("/login", loginUser);

module.exports = router;
