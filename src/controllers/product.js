const _ = require("lodash");
const catchAsync = require("express-async-handler");
const unLink = require("../utils/unLink");
const Product = require("../models/product");
const AppError = require("../utils/appError");

/**
 * @desc   -> Add new product document
 * @route  -> POST /api/products
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 */
exports.addProduct = catchAsync(async (req, res, next) => {
	const product = await Product.create(req.body);
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
		{ new: true, runValidators: true },
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
