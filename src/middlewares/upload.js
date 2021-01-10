const multer = require("../utils/multer");

exports.uploadImage = multer.single("image");
exports.uploadProfile = multer.single("profile");
