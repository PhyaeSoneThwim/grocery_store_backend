const express = require("express");
const categoryController = require("../controllers/category");
const restrictTo = require("../middlewares/restrictTo");
const protect = require("../middlewares/protect");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    protect,
    restrictTo("super-admin", "admin"),
    categoryController.addCategory
  );
router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(
    protect,
    restrictTo("super-admin", "admin"),
    categoryController.updateCategory
  )
  .delete(
    protect,
    restrictTo("super-admin", "admin"),
    categoryController.deleteCategory
  );

module.exports = router;
