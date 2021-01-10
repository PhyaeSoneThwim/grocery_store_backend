const express = require("express");
const reviewController = require("../controllers/review");
const restrictTo = require("../middlewares/restrictTo");
const protect = require("../middlewares/protect");
const router = express.Router({ mergeParams: true });

router.use(protect);
router
  .route("/")
  .get(reviewController.getReviews)
  .post(
    restrictTo("user"),
    reviewController.setProductUser,
    reviewController.addReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(restrictTo("user"), reviewController.updateReview)
  .delete(restrictTo("user"), reviewController.deleteReview);

module.exports = router;
