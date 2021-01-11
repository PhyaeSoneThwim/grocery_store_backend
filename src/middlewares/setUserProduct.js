const catchAsync = require("express-async-handler");
// @desc   -> attach product and user for new review
module.exports = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
});
