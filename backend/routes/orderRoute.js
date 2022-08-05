const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
    .route("/admin/orders")
    .get(isAuthenticatedUser, isAdmin, getAllOrders);
router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, isAdmin, updateOrder)
    .delete(isAuthenticatedUser, isAdmin, deleteOrder);

module.exports = router;