import { Request, Response } from "express";
import { FoodCategory } from "../../models";

export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    const categories = await FoodCategory.find();

    res.status(200).json({
      message: "Категориуд амжилттай татагдлаа",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Серверийн алдаа",
      error,
    });
  }
};
