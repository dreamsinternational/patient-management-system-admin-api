const express = require("express");
const router = express.Router();
const {
  createCronJob,
  getAllCronJobs,
  getCronJob,
  updateCronJob,
  deleteCronJob,
} = require("../controllers/protected/cronJob");

router.route("/").get(getAllCronJobs).post(createCronJob).delete(deleteCronJob);

router.route("/:id").get(getCronJob).put(updateCronJob);

module.exports = router;
