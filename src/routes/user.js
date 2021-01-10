const express = require("express");
const userController = require("../controllers/user");
const { uploadProfile } = require("../middlewares/upload");
const { resizeProfile } = require("../middlewares/resize");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const router = express.Router();

router.use(protect, restrictTo("super-admin"));
router
  .route("/")
  .post(uploadProfile, resizeProfile, userController.addUser)
  .get(userController.getUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .put(uploadProfile, resizeProfile, userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
