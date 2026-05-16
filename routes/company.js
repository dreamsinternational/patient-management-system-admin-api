const express = require("express");
const {
  getCompanies,
  deleteCompanies,
} = require("../controllers/private/company");
const {
  getCompanyUsers,
  deleteCompanyUsers,
} = require("../controllers/protected/companyUser");
const router = express.Router();

router.get("/company-users", getCompanyUsers);
router.delete("/company-users", deleteCompanyUsers);
router.get("/", getCompanies);
router.delete("/", deleteCompanies);
module.exports = router;