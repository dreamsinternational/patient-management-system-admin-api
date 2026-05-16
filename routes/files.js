const {
  getAllFileObjects,
  deleteFileObjects,
  getFileObject,
} = require("../controllers/protected/files");

const router = require("express").Router();

router.route("/").get(getAllFileObjects).delete(deleteFileObjects);

router.route("/:id").get(getFileObject);

module.exports = router;

