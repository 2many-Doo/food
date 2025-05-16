import { Router } from "express";
import { FoodOrderController } from "../controllers";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", FoodOrderController);
