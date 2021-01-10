const mongoose = require("mongoose");
const unLink = require("../utils/unLink");

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
		price: {
			type: Number,
			required: [true, "Product price is required"],
		},
		discount: {
			type: Number,
			default: 0,
		},
		category: {
			type: String,
			required: [true, "Product category is required"],
		},
		countInStock: {
			type: Number,
			required: [true, "In-stock count is required"],
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

productSchema.pre("remove", function (next) {
	if (this.image) {
		unLink(`public/img/products/${this.image}`);
		next();
	}
	next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
