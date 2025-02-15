import Category from "../models/categoryModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import internal from "stream";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.json({
        error: "Name is required",
      });
    }

    const exisitingCategory = await Category.findOne({ name });
    if (exisitingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name }).save();

    res.json(category);

    console.log(name);
  } catch (error) {
    console.log(error);
    return res.status();
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not Found" });
    }

    category.name = name;

    const updateCategory = await category.save();

    res.json(updateCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { createCategory, updateCategory };
