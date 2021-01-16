const _ = require("lodash");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const Order = require("../models/order");

/**
 * @desc   -> Add order items by user
 * @route  -> POST /api/orders
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.addOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create(_.assign(req.body, { user: req.user._id }));
  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

/**
 * @desc   -> Get order by id
 * @route  -> GET /api/orders/:id
 * @access -> Private
 * @allow  -> ["user","admin","super-admin"]
 * @status -> Finished
 */
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("No order found", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

/**
 * @desc   -> Get all orders
 * @route  -> GET /api/orders
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 * @status -> Finished
 */

exports.getOrders = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;

  const orders = await Order.find().skip(skip).limit(limit);
  if (!orders.length > 0) {
    return next(new AppError("No orders found", 404));
  }
  res.status(201).json({
    status: "success",
    length: orders.length,
    data: {
      orders,
    },
  });
});

/**
 * @desc   -> Get all user orders
 * @route  -> GET /api/orders/my-orders
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: req.user._id })
    .skip(skip)
    .limit(limit);

  if (!orders.length > 0) {
    return next(new AppError("No orders found", 404));
  }

  res.status(201).json({
    status: "success",
    length: orders.length,
    data: {
      orders,
    },
  });
});

/**
 * @desc   -> Update order to paid
 * @route  -> PUT /api/orders/:id/pay
 * @access -> Private
 * @allow  -> ["user"]
 * @status -> Finished
 */
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const { paymentResult } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("No order found", 404));
  }

  if (!paymentResult) {
    return next(new AppError("Payment process is not succeed", 402));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = paymentResult;

  const updatedOrder = await order.save();
  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

/**
 * @desc   -> Update order successfully delivered to user
 * @route  -> PUT /api/orders/:id/deliver
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 * @status -> Finished
 */
exports.updateOrderToDelivered = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order found", 404));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

/**
 * @desc   -> Delete order by doc._id
 * @route  -> DELETE /api/orders/:id
 * @access -> Private
 * @allow  -> ["admin","super-admin"]
 * @status -> Finished
 */
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("No order found", 404));
  }
  await order.remove();
  res.status(200).json({
    status: "success",
  });
});
