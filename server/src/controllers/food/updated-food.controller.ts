import { Food } from "../../models/food.models";
import { Request, Response } from "express";

type UpdatefoodBody = {
  foodName: string;
};
export const updatedFoodController = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;
    const { foodName } = req.body as UpdatefoodBody;

    if (!foodName || foodName.trim() === "") {
      res.status(400).json({ message: "food name is required" });
      return;
    }

    const food = await Food.findById(foodId);

    if (!food) {
      res.status(404).json({ message: "food not found" });
      return;
    }

    const existingFood = await Food.findOne({ foodName });
    if (existingFood && existingFood._id.toString() !== foodId) {
      res.status(409).json({ message: "food name already in use" });
      return;
    }

    food.foodName = foodName;

    res.status(200).json({ message: "foodupdated", food });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
