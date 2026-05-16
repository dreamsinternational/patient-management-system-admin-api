const express = require("express");
const router = express.Router();
const {
  createPlan,
  getAllPlan,
  getPlan,
  updatePlan,
  deletePlan,
} = require("../controllers/protected/plan");

router.route("/").get(getAllPlan).post(createPlan).delete(deletePlan);

router.route("/:id").get(getPlan).put(updatePlan);

module.exports = router;
