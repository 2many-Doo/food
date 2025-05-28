import { Router } from "express";
import {
  deleteFoodController,
  FoodController,
  getFoodById,
  updatedFoodController,
} from "../controllers";
import { athenticateUser, authorization } from "../middlewares";
import { Food, UserEnum } from "../models";

export const foodRouter = Router();

foodRouter
  .route("/create")
  .post(athenticateUser, authorization(UserEnum.ADMIN), FoodController);
foodRouter
  .route("/:id")
  .patch(athenticateUser, authorization(UserEnum.ADMIN), updatedFoodController);
foodRouter
  .route("/:id")
  .delete(athenticateUser, authorization(UserEnum.ADMIN), deleteFoodController);
foodRouter
  .route("/:id")
  .get(athenticateUser, authorization(UserEnum.ADMIN), getFoodById);
foodRouter.get("/", async (req, res) => {
  const foods = await Food.find(); // or .populate("category")
  res.send(foods);
});
