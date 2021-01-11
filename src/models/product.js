const mongoose = require("mongoose");
const unLink = require("../utils/unLink");

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
    ratings: {
      type: Number,
      default: 0.0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    numReviews: {
      type: Number,
      default: 0,
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
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Category belonging to the product is required"],
      ref: "Category",
    },
    countInStock: {
      type: Number,
      required: [true, "In-stock count is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre(/^find/, function (next) {
  this.populate("reviews");
  next();
});

productSchema.pre("remove", function (next) {
  if (this.image) {
    unLink(`public/img/products/${this.image}`);
    next();
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
