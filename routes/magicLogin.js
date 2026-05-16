const express = require("express");
const { createMagicLogin } = require("../controllers/protected/magicLogin");

const router = express.Router();

router.post("/", createMagicLogin);

module.exports = router;
