const express = require("express");
const router = express.Router();
const {
  initializeTimezones,
  getAllTimezones,
  searchTimezones,
  getTimezonesByOffset,
  updateTimezone,
  deleteTimezone,
  getTimezone,
  downloadGeoIP2,
  createTimezone,
} = require("../controllers/protected/timezone");
// Initialize timezones with bulk data
router.post("/initialize", initializeTimezones);
// MaxMind GeoIP2 Database Download
router.post("/download-geoip2", downloadGeoIP2);
// CRUD operations
router.post("/", createTimezone);
router.get("/", getAllTimezones);
// Search and filter operations - must come before /:id route
router.get("/search", searchTimezones);
router.get("/by-offset", getTimezonesByOffset);
// Bulk delete
router.delete("/", deleteTimezone);

// Routes with parameters must come after specific routes
router.get("/:id", getTimezone);
router.put("/:id", updateTimezone);

module.exports = router;
