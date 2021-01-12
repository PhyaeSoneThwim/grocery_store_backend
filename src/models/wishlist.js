const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user belonging to wishlists is required"],
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "product belonging to wishlists is required"],
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);
wishlistSchema.pre(/^find/, function (next) {
  this.populate({ path: "product" });
  next();
});
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
