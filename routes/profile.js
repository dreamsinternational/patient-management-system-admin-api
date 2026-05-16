const express = require("express");
const {
  getAdminProfile,
  updateAdminProfile,
} = require("../controllers/private/profile");
const router = express.Router();
router.get("/", getAdminProfile);
router.put("/", updateAdminProfile);
module.exports = router;
