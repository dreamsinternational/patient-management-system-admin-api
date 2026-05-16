const express = require("express");
const router = express.Router();
const {
  createCurrency,
  getAllCurrency,
  getCurrency,
  updateCurrency,
  deleteCurrency,
} = require("../controllers/protected/currency");

router
  .route("/")
  .get(getAllCurrency)
  .post(createCurrency)
  .delete(deleteCurrency);

router.route("/:id").get(getCurrency).put(updateCurrency);
module.exports = router;
