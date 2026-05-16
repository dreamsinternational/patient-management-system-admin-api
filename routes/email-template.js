const express = require("express");
const {
  createEmailTemplate,
  getEmailTemplate,
  getEmailTemplates,
  updateEmailTemplate,
} = require("../controllers/private/email-template");

const router = express.Router();

router.post("/", createEmailTemplate);
router.get("/:id", getEmailTemplate);
router.get("/", getEmailTemplates);
router.put("/:id", updateEmailTemplate);

module.exports = router;
