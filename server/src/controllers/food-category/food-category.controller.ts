import { FoodCategory } from "../../models";
import { Request, Response } from "express";

type FoodCategoryBody = { categoryName: string };

export const FoodCategoryController = async (req: Request, res: Response) => {
  const { categoryName } = req.body as FoodCategoryBody;

  const existingcategory = await FoodCategory.findOne({ categoryName });

  if (existingcategory) {
    res.status(400).send({ message: "Tiim Category bna" });
    return;
  }

  const newCategory = await FoodCategory.create({
    categoryName,
  });

  res.status(201).send({ message: "bolson", newCategory });
};
