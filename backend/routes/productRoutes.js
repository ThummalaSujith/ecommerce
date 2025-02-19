import express from "express";

import formidable from "express-formidable";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProducts,
  addProductReview
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(fetchProduct).post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts)

router.route("/:id/reviews").post(authenticate,authorizeAdmin,addProductReview)

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
