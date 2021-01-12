const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const Review = require("../models/review");

/**
 * @desc   -> add new review
 * @route  -> POST /api/products/:productId/reviews
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.addReview = catchAsync(async (req, res, next) => {
  const existReview = await Review.findOne({ user: req.user._id });
  if (existReview) {
    return next(
      new AppError("Only one user can review product at a time", 409)
    );
  }
  const review = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

/**
 * @desc   -> get all reviews
 * @route  -> GET /api/products/:productId/reviews
 * @access -> Private
 * @status -> Finished
 */
exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(req.params.propertyId);
  if (!reviews.length > 0) {
    return next(new AppError("no reviews"), 404);
  }
  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

/**
 * @desc   -> get review by id
 * @route  -> GET /api/products/:productId/reviews/:id
 * @access -> Private
 * @status -> Finished
 */
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("no review", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

/**
 * @desc   -> update review by id
 * @route  -> PATCH /api/products/:productId/reviews/:id
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("no review", 404));
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      review: updatedReview,
    },
  });
});

/**
 * @desc   -> delete review by id
 * @route  -> DELETE /api/products/:productId/reviews/:id
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("no review", 404));
  }

  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  });
});
