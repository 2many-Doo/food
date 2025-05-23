import { FoodCategory } from "../../models";
import { Request, Response } from "express";

type UpdateCategoryBody = {
  categoryName: string;
};

export const updateFoodCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { categoryName } = req.body as UpdateCategoryBody;

    if (!categoryName || categoryName.trim() === "") {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    const category = await FoodCategory.findById(categoryId);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const existingCategory = await FoodCategory.findOne({ categoryName });
    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      res.status(409).json({ message: "Category name already in use" });
      return;
    }

    category.categoryName = categoryName;
    await category.save();

    res.status(200).json({ message: "Category updated", category });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
