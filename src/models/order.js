const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User belonging to order is required"],
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Order item name (English) is required"],
        },
        mmName: {
          type: String,
          required: [true, "Order item name (Myanmar) is required"],
        },
        price: {
          type: Number,
          required: [true, "Order item price is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Order quantity is required"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: "Order item belonging to product is required",
        },
      },
    ],
    contactNumber: {
      type: String,
      required: [true, "Order contact number is required"],
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      township: {
        type: String,
        required: [true, "Township is required"],
      },
      region: {
        type: String,
        required: [true, "Region is required"],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: [true, "Order tax price is required"],
    },
    taxPrice: {
      type: Number,
      required: [true, "Order tax price is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Order tax price is required"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
