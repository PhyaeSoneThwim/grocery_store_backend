const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "user belonging to review is required"],
		},
		rating: {
			type: Number,
			required: [true, "Review ratings is required"],
		},
		comment: {
			type: String,
			required: [true, "Comment for review is required"],
		},
	},
	{ timestamps: true },
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "User belonging to product is required"],
			ref: "User",
		},
		name: {
			type: String,
			required: [true, "Product name is required"],
		},
		image: {
			type: String,
			required: [true, "Product image is required"],
		},
		category: {
			type: String,
			required: [true, "Product category is required"],
		},
		countInStock: {
			type: Number,
			required: [true, "In-stock count is required"],
			default: 0,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			default: 0.0,
		},
		numReviews: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
