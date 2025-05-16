import { Router } from "express";
import { FoodController } from "../controllers";

export const foodRouter = Router();

foodRouter.post("/create", FoodController);
