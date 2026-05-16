const { initiateDB } = require("../controllers/test/initiateDB");
const {
  initializeTimezonesFromFile,
} = require("../controllers/test/initializeTimezones");

const router = require("express").Router();

router.get("/initiateDB/:password", initiateDB);

// Initialize timezones from file
router.get("/initialize-timezones/:password", async (req, res) => {
  try {
    const { password } = req.params;
    const { clearExisting = "false", updateExisting = "true" } = req.query;

    // Add basic password protection (use a strong password in production)
    if (password !== "admin123") {
      // Change this to a secure password
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("Initializing timezones via test route...");
    console.log(
      `Options: clearExisting=${clearExisting}, updateExisting=${updateExisting}`
    );

    const result = await initializeTimezonesFromFile(
      clearExisting === "true",
      updateExisting === "true"
    );

    res.json({
      success: true,
      message: "Timezones initialized successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error initializing timezones:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initialize timezones",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

module.exports = router;
