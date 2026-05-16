const express = require("express");

const {
  updateSettings,
  getSettings,
  getPlanGlobalSettings,
  updatePlanGlobalSettings,
} = require("../controllers/protected/settings");

const router = express.Router();

router.put("/", updateSettings);
router.get("/", getSettings);
router.get("/plan-global", getPlanGlobalSettings);
router.put("/plan-global", updatePlanGlobalSettings);

module.exports = router;
