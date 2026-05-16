const express = require("express");
const {
  getAdminNotificationReportController,
} = require("../controllers/protected/reports");

const router = express.Router();

router.get("/admin-notifications", getAdminNotificationReportController);

module.exports = router;
