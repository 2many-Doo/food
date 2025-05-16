import { Router } from "express";
import { FoodCategoryController } from "../controllers/food-category";

export const foodcategoriesRouter = Router();

foodcategoriesRouter.post("/", FoodCategoryController);
