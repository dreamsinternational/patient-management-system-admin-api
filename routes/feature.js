const express = require("express");
const router = express.Router();
const {
  createFeature,
  getAllFeature,
  getFeature,
  updateFeature,
  deleteFeature,
} = require("../controllers/protected/feature");

// GET all features
router.route("/").get(getAllFeature).post(createFeature).delete(deleteFeature);

// GET single feature by ID
router.get("/:id", getFeature);

// PUT update feature
router.put("/:id", updateFeature);

// DELETE features
module.exports = router;