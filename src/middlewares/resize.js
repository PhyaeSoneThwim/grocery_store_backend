const { uuid } = require("uuidv4");
const sharp = require("sharp");
const catchAsync = require("express-async-handler");

// @desc -> resize user profile
exports.resizeProfile = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `${req.file.fieldname}-${uuid()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/profiles/${filename}`);
  req.body.profile = filename;
  next();
});

// @desc -> resize product image
exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `${req.file.fieldname}-${uuid()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${filename}`);
  req.body.image = filename;
  next();
});
