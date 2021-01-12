const catchAsync = require("express-async-handler");
const Wishlist = require("../models/wishlist");
const AppError = require("../utils/appError");

/**
 * @desc   -> add product into new wishlist
 * @route  -> POST /api/products/:productId/wishlists
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.addWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.create(req.body);
  res.status(201).send({
    status: "success",
    data: {
      wishlist,
    },
  });
});

/**
 * @desc   -> add product into new wishlist
 * @route  -> POST /api/products/:productId/wishlists
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */

exports.getWishlists = catchAsync(async (req, res, next) => {
  const wishlists = await Wishlist.find({ user: req.user._id });
  if (!wishlists.length > 0) {
    return next(new AppError("No wishlists found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      wishlists,
    },
  });
});

/**
 * @desc   -> add product into new wishlist
 * @route  -> POST /api/products/:productId/wishlists
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.deleteWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist) {
    return next(new AppError("No wishlist found to delete", 404));
  }
  await wishlist.remove();
  res.status(200).json({
    status: "success",
  });
});
