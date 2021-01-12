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
    mmName: {
      type: String,
      required: [true, "Product myanamr name is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    ratings: {
      type: Number,
      default: 0.0,
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
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
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
  this.populate("reviews").populate({
    path: "category",
    select: "title mmTitle -_id",
  });
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
