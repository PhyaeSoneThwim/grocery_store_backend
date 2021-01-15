const _ = require("lodash");
const catchAsync = require("express-async-handler");
const unLink = require("../utils/unLink");
const Product = require("../models/product");
const Category = require("../models/category");
const AppError = require("../utils/appError");
const Review = require("../models/review");

/**
 * @desc   -> Add new product document
 * @route  -> POST /api/products
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 */
exports.addProduct = catchAsync(async (req, res, next) => {
  // assign user._id from protect middleware
  const product = await Product.create(
    _.assign(req.body, { user: req.user._id })
  );
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

/**
 * @desc   -> get product document
 * @route  -> GET /api/products/:id
 * @access -> Public
 */
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product fond", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

/**
 * @desc   -> get products grouped by category
 * @route  -> GET /api/products/categoried-product
 * @access -> Public
 */
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find().skip(skip).limit(limit).lean();

  // grouped products by category
  const products = await Promise.all(
    categories.map(async (category) => {
      const groupedProducts = await Product.find({ category: category._id });
      return { ...category, products: groupedProducts };
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

/**
 * @desc   -> get all product document
 * @route  -> GET /api/products
 * @access -> Public
 */
exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  if (!products.length > 0) {
    return next(new AppError("No products found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

/**
 * @desc   -> update document by _id
 * @route  -> GET /api/products/:id
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 */
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product fond", 404));
  }

  // @desc -> delete & update with new image
  if (req.body.image) {
    unLink(`public/img/products/${product.image}`);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

/**
 * @desc   -> update document by _id
 * @route  -> GET /api/products/:id
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product fond", 404));
  }
  await product.remove();
  res.status(200).json({
    status: "success",
  });
});

exports.setProductUser = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.id;
  next();
});

exports.addReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});
