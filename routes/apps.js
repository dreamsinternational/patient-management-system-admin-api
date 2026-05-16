const express = require("express");
const router = express.Router();
const { getApp } = require("../controllers/protected/apps");
const {
  getAllRazorpayHandler,
  createRazorpayHandler,
  updateRazorpayHandler,
  deleteRazorpayHandler,
  getRazorpayHandler,
} = require("../controllers/protected/razorpay");
const {
  getAllPhonepeHandler,
  createPhonepeHandler,
  deletePhonepeHandler,
  getPhonepeHandler,
  updatePhonepeHandler,
} = require("../controllers/protected/phonePe");
const {
  getAllOcrHandler,
  createOcrHandler,
  deleteOcrHandler,
  getOcrHandler,
  updateOcrHandler,
} = require("../controllers/protected/ocr");
const {
  getAllGemini,
  createGemini,
  deleteGemini,
  getGemini,
  updateGemini,
  getAvailableModels,
} = require("../controllers/protected/gemini");
const {
  getAllInstagram,
  createInstagram,
  deleteInstagram,
  getInstagram,
  updateInstagram,
  setDefaultInstagram,
} = require("../controllers/protected/instagram");
const {
  getAllOpenAI,
  createOpenAI,
  deleteOpenAI,
  updateOpenAI,
  getOpenAI,
  getAvailableOpenAIModelsController,
} = require("../controllers/protected/openai");
const {
  getAllManualPaymentHandler,
  createManualPaymentHandler,
  deleteManualPaymentHandler,
  getManualPaymentHandler,
  updateManualPaymentHandler,
} = require("../controllers/protected/manualPayment");
const {
  getAllS3BucketHandler,
  getS3BucketHandler,
  createS3BucketHandler,
  deleteS3BucketHandler,
  updateS3BucketHandler,
} = require("../controllers/protected/s3bucket");
const {
  getAllFacebooks,
  deleteFacebook,
  createFacebook,
  getFacebook,
  updateFacebook,
  setDefaultFacebookController,
} = require("../controllers/protected/Facebook");
const {
  getAllOAuthFacebooks,
  createOAuthFacebook,
  deleteOAuthFacebook,
  getOAuthFacebook,
  updateOAuthFacebook,
} = require("../controllers/protected/OAuthFacebook");
const {
  getAllOAuthWhatsApps,
  createOAuthWhatsApp,
  deleteOAuthWhatsApp,
  getOAuthWhatsApp,
  updateOAuthWhatsApp,
} = require("../controllers/protected/OAuthWhatsApp");

router.route("/").get(getApp);
router
  .route("/razorpay")
  .get(getAllRazorpayHandler)
  .post(createRazorpayHandler)
  .delete(deleteRazorpayHandler);
router
  .route("/razorpay/:id")
  .get(getRazorpayHandler)
  .put(updateRazorpayHandler);
router
  .route("/phonepe")
  .get(getAllPhonepeHandler)
  .post(createPhonepeHandler)
  .delete(deletePhonepeHandler);
router.route("/phonepe/:id").get(getPhonepeHandler).put(updatePhonepeHandler);
router
  .route("/ocr")
  .get(getAllOcrHandler)
  .post(createOcrHandler)
  .delete(deleteOcrHandler);
router.route("/ocr/:id").get(getOcrHandler).put(updateOcrHandler);
router
  .route("/s3bucket")
  .get(getAllS3BucketHandler)
  .post(createS3BucketHandler)
  .delete(deleteS3BucketHandler);
router
  .route("/s3bucket/:id")
  .get(getAllS3BucketHandler)
  .put(updateS3BucketHandler);
router
  .route("/manual-payment")
  .get(getAllManualPaymentHandler)
  .post(createManualPaymentHandler)
  .delete(deleteManualPaymentHandler);
router
  .route("/manual-payment/:id")
  .get(getManualPaymentHandler)
  .put(updateManualPaymentHandler);
router
  .route("/gemini")
  .get(getAllGemini)
  .post(createGemini)
  .delete(deleteGemini);
// Specific routes must come before parameterized routes
router.route("/gemini/models").get(getAvailableModels);
router.route("/gemini/:id").get(getGemini).put(updateGemini);
router
  .route("/openai")
  .get(getAllOpenAI)
  .post(createOpenAI)
  .delete(deleteOpenAI);
// Specific routes must come before parameterized routes
router.route("/openai/models").get(getAvailableOpenAIModelsController);
router.route("/openai/:id").get(getOpenAI).put(updateOpenAI);
router
  .route("/instagram")
  .get(getAllInstagram)
  .post(createInstagram)
  .delete(deleteInstagram);
router.route("/instagram/:id").get(getInstagram).put(updateInstagram);
router.route("/instagram/:id/set-default").put(setDefaultInstagram);
router.route("/facebook").get(getAllFacebooks);
// .post(createFacebook)
// .delete(deleteFacebook);
router.route("/facebook/:id").get(getFacebook).put(updateFacebook);
router.route("/facebook/:id/set-default").put(setDefaultFacebookController);
router
  .route("/oAuthFacebook")
  .get(getAllOAuthFacebooks)
  .post(createOAuthFacebook)
  .delete(deleteOAuthFacebook);
router
  .route("/oAuthFacebook/:id")
  .get(getOAuthFacebook)
  .put(updateOAuthFacebook);
router
  .route("/oAuthWhatsApp")
  .get(getAllOAuthWhatsApps)
  .post(createOAuthWhatsApp)
  .delete(deleteOAuthWhatsApp);
router
  .route("/oAuthWhatsApp/:id")
  .get(getOAuthWhatsApp)
  .put(updateOAuthWhatsApp);
module.exports = router;
