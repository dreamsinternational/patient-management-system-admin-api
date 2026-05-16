const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/protected/payment");

router.route("/").get(getAllPayment).delete(deletePayment);

router.route("/:id").get(getPayment).put(updatePayment);

module.exports = router;