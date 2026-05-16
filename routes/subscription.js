const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getAllSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/protected/subscription");

router
  .route("/")
  .get(getAllSubscription)
  .post(createSubscription)
  .delete(deleteSubscription);
router.route("/:id").get(getSubscription).put(updateSubscription);
module.exports = router;
