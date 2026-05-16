const express = require("express");
const router = express.Router();
router.use("/profile", require("./profile"));
router.use("/res-msg", require("./res-msg"));
router.use("/email-template", require("./email-template"));
router.use("/email-template-category", require("./email-template-category"));
router.use("/s3bucket", require("./s3bucket-setttings"));
router.use("/country-state-city", require("./countryStateCity"));
module.exports = router;