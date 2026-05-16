const express = require("express");
const router = express.Router();
const {
  createGemini,
  getAllGemini,
  getGemini,
  updateGemini,
  deleteGemini,
  getAvailableModels,
  setDefaultGemini,
} = require("../controllers/protected/gemini");

// CRUD operations
router.post("/", createGemini);
router.get("/", getAllGemini);

// Get available models - must come before /:id route
router.get("/models", getAvailableModels);

// Routes with parameters must come after specific routes
router.get("/:id", getGemini);
router.put("/:id", updateGemini);
router.delete("/:id", deleteGemini);

// Set default configuration
router.patch("/:id/set-default", setDefaultGemini);

module.exports = router;
