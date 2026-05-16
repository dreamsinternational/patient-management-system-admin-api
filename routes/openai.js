const express = require("express");
const router = express.Router();

const {
  createOpenAI,
  getAllOpenAI,
  getOpenAI,
  updateOpenAI,
  deleteOpenAI,
  getAvailableModels,
  setDefaultOpenAI,
} = require("../controllers/protected/openai");

// CRUD operations
router.post("/", createOpenAI);
router.get("/", getAllOpenAI);

// Get available models (must be before /:id)
router.get("/models", getAvailableModels);

// Routes with parameters
router.get("/:id", getOpenAI);
router.put("/:id", updateOpenAI);
router.delete("/:id", deleteOpenAI);

// Set default configuration
router.patch("/:id/set-default", setDefaultOpenAI);

module.exports = router;
