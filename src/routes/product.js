const express = require("express");
const { uploadImage } = require("../middlewares/upload");
const { resizeImage } = require("../middlewares/resize");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const productController = require("../controllers/product");
const wishlistRoute = require("./wishlist");
const reviewRoute = require("./review");

const router = express.Router();
router
  .route("/")
  .post(
    protect,
    restrictTo("admin", "super-admin"),
    uploadImage,
    resizeImage,
    productController.addProduct
  )
  .get(productController.getProducts);
router
  .route("/:id")
  .get(productController.getProduct)
  .put(
    protect,
    restrictTo("admin", "super-admin"),
    uploadImage,
    resizeImage,
    productController.updateProduct
  )
  .delete(
    protect,
    restrictTo("admin", "super-admin"),
    productController.deleteProduct
  );

router.use("/:productId/wishlists", wishlistRoute);
router.use("/:productId/reviews", reviewRoute);

module.exports = router;
