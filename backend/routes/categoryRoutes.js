import express from "express";
import { createCategory } from "../controllers/categoryController.js";

const router = express.Router()


import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";


router.route('/').post(createCategory)

export default router;