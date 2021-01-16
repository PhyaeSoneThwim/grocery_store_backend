const express = require("express");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const orderController = require("../controllers/order");
const router = express.Router();

// authorize permissions for admin & super-admin
const authorize = restrictTo("admin", "super-admin");

// only authenticated user can access all defined routes
router.use(protect);

// route defined to get user's orders
router.get("/my-orders", orderController.getMyOrders);

// route to make user's order payment
router.put("/:id/pay", restrictTo("user"), orderController.updateOrderToPaid);

// route to make order successfully delivered to user
router.put("/:id/deliver", authorize, orderController.updateOrderToDelivered);

router.route("/").post(orderController.addOrder).get(orderController.getOrders);

router
  .route("/:id")
  .get(orderController.getOrder)
  .delete(authorize, orderController.deleteOrder);

module.exports = router;
