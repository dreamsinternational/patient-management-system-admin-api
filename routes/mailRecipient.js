const express = require("express");
const router = express.Router();
const {
  createMailRecipient,
  getAllMailRecipients,
  getMailRecipient,
  updateMailRecipient,
  //   deleteMailRecipient,
} = require("../controllers/protected/mailRecipient");

router.route("/").get(getAllMailRecipients).post(createMailRecipient);
//   .delete(deleteMailRecipient);


router.route("/:id").get(getMailRecipient).put(updateMailRecipient);

module.exports = router;