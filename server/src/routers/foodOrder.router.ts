import { Router } from "express";
import { FoodOrderController } from "../controllers";
import { athenticateUser, authorization } from "../middlewares";
import { UserEnum } from "../models";

export const foodOrderRouter = Router();

foodOrderRouter
  .route("/")
  .post(athenticateUser, authorization(UserEnum.ADMIN), FoodOrderController);
