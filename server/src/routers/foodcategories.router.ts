import { Router } from "express";
import {
  FoodCategoryController,
  updateFoodCategory,
  deleteFoodCategory,
  getAllFoodCategories,
} from "../controllers/food-category";
import { athenticateUser, authorization } from "../middlewares";
import { UserEnum } from "../models";

export const foodcategoriesRouter = Router();

foodcategoriesRouter
  .route("/")
  .post(athenticateUser, authorization(UserEnum.ADMIN), FoodCategoryController);
foodcategoriesRouter
  .route("/:id")
  .patch(athenticateUser, authorization(UserEnum.ADMIN), updateFoodCategory);
foodcategoriesRouter
  .route("/:id")
  .delete(athenticateUser, authorization(UserEnum.ADMIN), deleteFoodCategory);
foodcategoriesRouter
  .route("/:id")
  .get(athenticateUser, authorization(UserEnum.ADMIN), getAllFoodCategories);
