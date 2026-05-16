const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/protected/coupon");
router.route("/").get(getAllCoupon).post(createCoupon).delete(deleteCoupon);
router.route("/:id").get(getCoupon).put(updateCoupon);

module.exports = router;
