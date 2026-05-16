const express = require("express");
const router = express.Router();
const {
  createDashboardPreset,
  getAllDashboardPresets,
  getDashboardPreset,
  updateDashboardPreset,
  deleteDashboardPreset,
} = require("../controllers/protected/dashboardPresets");

router
  .route("/")
  .get(getAllDashboardPresets)
  .post(createDashboardPreset)
  .delete(deleteDashboardPreset);
router.route("/:id").get(getDashboardPreset).put(updateDashboardPreset);
module.exports = router;