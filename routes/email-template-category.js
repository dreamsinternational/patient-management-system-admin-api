const {
  getAllEmailTemplateCategories,
  getEmailTemplateCategories,
  updateEmailTemplateCategory,
} = require("../controllers/private/email-template-category");

const router = require("express").Router();

router.get("/", getAllEmailTemplateCategories);
router.get("/:category", getEmailTemplateCategories);
router.put("/:category", updateEmailTemplateCategory);

module.exports = router;
