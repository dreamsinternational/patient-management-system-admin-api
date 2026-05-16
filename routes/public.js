const {
  forgotPassword,
  verifyForgotOTP,
  resetPassword,
  login,
  emailVerification,
  resendOtp,
  verify2FactAuth,
  changePassword,
} = require("../controllers/public/authentication");

const { getCountryFromIP } = require("../controllers/public/geolocation");

const router = require("express").Router();

router.post("/resend-otp/:category", resendOtp);
router.post("/login", login);
router.post("/email-verification", emailVerification);
router.post("/change-password", changePassword);
router.post("/verify-two-factor-auth", verify2FactAuth);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOTP);
// Geolocation API
router.get("/geolocation/country", getCountryFromIP);

module.exports = router;
