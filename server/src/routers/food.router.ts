import { Router } from "express";
import {
  FoodController,
  updatedFoodController,
  updateFoodCategory,
} from "../controllers";
import { athenticateUser, authorization } from "../middlewares";
import { UserEnum } from "../models";

export const foodRouter = Router();

foodRouter
  .route("/create")
  .post(athenticateUser, authorization(UserEnum.ADMIN), FoodController);
foodRouter
  .route("/create/:id")
  .patch(athenticateUser, authorization(UserEnum.ADMIN), updatedFoodController);
