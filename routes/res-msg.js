const express = require("express");
const {
  createResMsg,
  getResMsg,
  getResMsgs,
  updateResMsg,
} = require("../controllers/private/response-message");

const router = express.Router();

router.post("/", createResMsg);

router.get("/:key", getResMsg);

router.get("/:panel/:type", getResMsgs);

router.put("/:key", updateResMsg);

module.exports = router;
