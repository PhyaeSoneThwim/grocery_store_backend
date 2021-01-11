const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const Category = require("../models/category");

/**
 * @desc   -> Add category
 * @route  -> POST /api/categories
 * @access -> Private
 * @allow  -> ["super-admin","admin"]
 * @status -> Progress
 */
exports.addCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

/**
 * @desc   -> Get category by _id
 * @route  -> GET /api/categories/:id
 * @access -> Public
 * @status -> Progress
 */
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

/**
 * @desc   -> Get all categories
 * @route  -> GET /api/categories
 * @access -> Public
 * @status -> Progress
 */
exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({});
  if (!categories.length > 0) {
    return next(new AppError("No categories found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

/**
 * @desc   -> Update category by id
 * @route  -> PUT /api/categories/:id
 * @access -> Private
 * @allow  -> ["super-admin","admin"]
 * @status -> Progress
 */
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found", 404));
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      category: updatedCategory,
    },
  });
});

/**
 * @desc   -> delete category by id
 * @route  -> DELETE /api/categories/:id
 * @access -> Private
 * @allow  -> ["super-admin","admin"]
 * @status -> Progress
 */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found", 404));
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      category: updatedCategory,
    },
  });
});
