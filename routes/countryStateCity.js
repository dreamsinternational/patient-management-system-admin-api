const express = require("express");
const router = express.Router();
const {
  countryStateCityHandler,
} = require("../controllers/private/countryStateCity");

router.route("/").get(countryStateCityHandler);

module.exports = router;
