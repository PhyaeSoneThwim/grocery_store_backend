const multer = require("multer");
const AppError = require("./appError");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only images are allowed", 400), false);
  }
};

module.exports = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
