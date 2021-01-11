const mongoose = require("mongoose");
const slugify = require("slugify");
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
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
