const express = require("express");
const router = express.Router();
const {
  createWidget,
  getAllWidget,
  getWidget,
  getWidgetOptions,
  updateWidget,
  deleteWidget,
} = require("../controllers/protected/dashboard");
router
  .route("/widget")
  .get(getAllWidget)
  .post(createWidget)
  .delete(deleteWidget);
router.route("/widget/:id").get(getWidget).put(updateWidget);
router.route("/widget-options").get(getWidgetOptions);
module.exports = router;
