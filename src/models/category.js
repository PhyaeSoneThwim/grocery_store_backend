const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is requried"],
    },
    description: String,
    mmTitle: {
      type: String,
      required: [true, "Category myanmar title is required"],
    },
    mmDescription: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parentId: {
      type: String,
      required: [true, "Parent category is required"],
    },
    slug: String,
  },
  { timestamps: true }
);
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Category = mongoose.Model("Category", categorySchema);
module.exports = Category;
