import express from "express";
import { createCategory,updateCategory } from "../controllers/categoryController.js";

const router = express.Router()


import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";


router.route('/').post(authenticate,authorizeAdmin,createCategory)

router.route("/:categoryId").put(authenticate,authorizeAdmin,updateCategory)

router.route("/:categoryId").delete(authenticate,authorizeAdmin,deleteCategory)

export default router;