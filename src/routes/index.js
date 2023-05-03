const { Router } = require("express");

const user = require("./user");

const router = Router();

router.use("/", user);

module.exports = router;
