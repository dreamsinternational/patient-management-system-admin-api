const express = require("express");
const {
  getLoginLogs,
  getLogs,
  getSpecialLogs,
  getAdminLoginLogs,
  getAdminActivityLogs,
  getAdminForgetPassLogs,
  getCronJobLogs,
} = require("../controllers/protected/logs");

const router = express.Router();

router.get("/login", getLoginLogs);
router.get("/", getLogs);
router.get("/special", getSpecialLogs);
router.get("/admin-login", getAdminLoginLogs);
router.get("/admin-activity", getAdminActivityLogs);
router.get("/admin-forgot-password", getAdminForgetPassLogs);
router.get("/cron-job", getCronJobLogs);

module.exports = router;
