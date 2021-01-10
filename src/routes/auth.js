const express = require("express");
const protect = require("../middlewares/protect");
const userController = require("../controllers/user");
const { uploadProfile } = require("../middlewares/upload");
const { resizeProfile } = require("../middlewares/resize");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.use(protect);
router.get("/me", userController.getMe, userController.getUser);
router.put("/update-me", uploadProfile, resizeProfile, userController.updateMe);
router.put("/update-password", userController.updatePassword);

module.exports = router;
