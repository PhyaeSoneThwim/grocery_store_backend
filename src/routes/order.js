const express = require("express");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const orderController = require("../controllers/order");
const router = express.Router();

router.use(protect);

router.get("/my-orders", orderController.getMyOrders);

router.put("/:id/pay", restrictTo("user"), orderController.updateOrderToPaid);

router.put(
  "/:id/deliver",
  restrictTo("admin", "super-admin"),
  orderController.updateOrderToDelivered
);

router.route("/").post(orderController.addOrder).get(orderController.getOrders);

router
  .route("/:id")
  .get(orderController.getOrder)
  .delete(restrictTo("admin", "super-admin"), orderController.deleteOrder);

module.exports = router;
