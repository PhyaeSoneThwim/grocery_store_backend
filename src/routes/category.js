const express = require("express");
const { uploadCover } = require("../middlewares/upload");
const { resizeCover } = require("../middlewares/resize");
const categoryController = require("../controllers/category");
const restrictTo = require("../middlewares/restrictTo");
const protect = require("../middlewares/protect");
const router = express.Router();

const authorize = restrictTo("super-admin", "admin");

router.get(
  "/top-3-featured",
  categoryController.getFeaturedProducts,
  categoryController.getCategories
);

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    protect,
    authorize,
    uploadCover,
    resizeCover,
    categoryController.addCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(
    protect,
    authorize,
    uploadCover,
    resizeCover,
    categoryController.updateCategory
  )
  .delete(protect, authorize, categoryController.deleteCategory);

module.exports = router;
