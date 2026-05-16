const express = require("express");

const {
  updateDeveloperSettings,
  getDeveloperSettings,
} = require("../controllers/protected/developerSettings");

const router = express.Router();

router.put("/", updateDeveloperSettings);
router.get("/", getDeveloperSettings);

module.exports = router;
