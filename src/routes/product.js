const express = require("express");
const { uploadImage } = require("../middlewares/upload");
const { resizeImage } = require("../middlewares/resize");
const productController = require("../controllers/product");

const router = express.Router();

router
	.route("/")
	.post(uploadImage, resizeImage, productController.addProduct)
	.get(productController.getProducts);
router
	.route("/:id")
	.get(productController.getProduct)
	.put(uploadImage, resizeImage, productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
