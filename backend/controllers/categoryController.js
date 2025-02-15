import Category from "../models/categoryModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";

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

    res.json(category)

    console.log(name);
  } catch (error) {
    console.log(error);
    return res.status();
  }
});

export { createCategory };
