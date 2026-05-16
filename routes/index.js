const authenticate = require("../middlewares/authenticate");
const adminActivityLogger = require("../middlewares/adminActivityLogger");
const router = require("express").Router();
router.use("/test", require("./test"));

router.use("/public", require("./public"));
router.use(authenticate);
router.use(adminActivityLogger);

router.use("/private", require("./private"));
router.use("/protected", require("./protected"));
router.use("/test", require("./test"));

module.exports = router;
