import mongoose from "mongoose";
import { Food } from "../../models/food.models";
import { Request, Response } from "express";

type UpdatefoodBody = {
  foodName?: string;
  ingredients?: string;
  image?: string;
  category?: string;
};

export const updatedFoodController = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;
    const { foodName, ingredients, image, category } =
      req.body as UpdatefoodBody;

    if (!foodName || foodName.trim() === "") {
      res.status(400).json({ message: "Food name is required" });
      return;
    }

    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    const existingFood = await Food.findOne({ foodName });
    if (existingFood && existingFood._id.toString() !== foodId) {
      res.status(409).json({ message: "Food name already in use" });
      return;
    }

    food.foodName = foodName;
    if (ingredients) food.ingredients = ingredients;
    if (image) food.image = image;
    // if (category) food.category = new mongoose.Types.ObjectId(category);

    await food.save();

    res.status(200).json({ message: "Food updated", food });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
