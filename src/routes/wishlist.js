const express = require("express");
const wishlistController = require("../controllers/wishlist");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const setUserProduct = require("../middlewares/setUserProduct");

const router = express.Router({ mergeParams: true });

router.use(protect, restrictTo("user"));
router
  .route("/")
  .post(setUserProduct, wishlistController.addWishlist)
  .get(wishlistController.getWishlists);

router.delete("/:id", wishlistController.deleteWishlist);

module.exports = router;
