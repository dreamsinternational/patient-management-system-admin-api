const express = require("express");
const {
  createS3bucketSettings,
  getS3bucketSetting,
  getS3bucketSettings,
  updateS3bucketSetting,
  deleteS3bucketSettings,
  setDefaultS3bucket,
} = require("../controllers/private/s3bucket-settings");
const router = express.Router();
router.post("/", createS3bucketSettings);
router.get("/:id", getS3bucketSetting);
router.get("/", getS3bucketSettings);
router.put("/:id", updateS3bucketSetting);
router.delete("/", deleteS3bucketSettings);
router.get("/setDefault/:id", setDefaultS3bucket);
module.exports = router;
