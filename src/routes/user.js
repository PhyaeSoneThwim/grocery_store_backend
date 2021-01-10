const express = require("express");
const userController = require("../controllers/user");
const { uploadProfile } = require("../middlewares/upload");
const { resizeProfile } = require("../middlewares/resize");
const protect = require("../middlewares/protect");
const router = express.Router();

router.route("/").get(userController.getUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .put(uploadProfile, resizeProfile, userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
