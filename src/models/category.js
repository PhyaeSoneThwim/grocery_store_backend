const mongoose = require("mongoose");
const slugify = require("slugify");
const Product = require("./product");
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is requried"],
    },
    mmTitle: {
      type: String,
      required: [true, "Category myanmar title is required"],
    },
    description: String,
    mmDescription: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    slug: String,
  },
  { timestamps: true }
);

// slugify incoming category title for better search
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// delete all products related to deleted category
categorySchema.pre("remove", async function (next) {
  const products = await Product.find({ category: this._id });

  // use doc.remove to apply pre-remove middleware
  if (products.length > 0) {
    products.map(async (product) => {
      await product.remove({ category: this._id });
    });
    next();
  }
  next();
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
