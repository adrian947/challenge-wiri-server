const { Router } = require("express");
const router = Router();
const user = require("./user");
const turns = require("./turns");

router.use("/", user);
router.use("/", turns);

module.exports = router;
