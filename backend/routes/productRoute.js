const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, getAdminProducts, } = require("../controllers/productController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, isAdmin, getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, isAdmin, createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, isAdmin, updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, isAdmin, deleteProduct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router