const _ = require("lodash");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const Category = require("../models/category");
const unLink = require("../utils/unLink");

/**
 * @desc   -> Add category
 * @route  -> POST /api/categories
 * @access -> Private
 * @allow  -> ["super-admin","admin"]
 * @status -> Finished
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
 * @status -> Finished
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
 * @desc   -> middleware to get top 3 featured products
 * @route  -> GET /api/categories/top-3-featured
 * @access -> Public
 * @status -> Progress
 */
exports.getFeaturedProducts = (req, res, next) => {
  req.query.limit = 3;
  req.query.isFeatured = true;
  next();
};

/**
 * @desc   -> Get all categories
 * @route  -> GET /api/categories
 * @access -> Public
 * @status -> Finished
 */
exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({
    isFeatured: !!req.query.isFeatured,
  }).limit(req.query.limit);

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
 * @status -> Finished
 */
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found", 404));
  }

  // delete existing image for image update
  if (req.body.cover && category.cover) {
    unLink(`public/img/categories/${category.cover}`);
  }

  // update category with incoming updated data
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
 * @status -> Finished
 */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("No category found", 404));
  }
  await category.remove();
  res.status(200).json({
    status: "success",
  });
});
