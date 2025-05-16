import { FoodOrderModel } from "../../models";
import { Request, Response } from "express";

type FoodOrderItem = {
  food: string;
  quantity: number;
};
type FoodOrderBody = {
  user: string;
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: "PENDING" | "CANCELED" | "DELIVERED";
};
export const FoodOrderController = async (req: Request, res: Response) => {
  const { user, totalPrice, foodOrderItems, status } =
    req.body as FoodOrderBody;

  if (
    !user ||
    !totalPrice ||
    !foodOrderItems ||
    !Array.isArray(foodOrderItems) ||
    foodOrderItems.length === 0
  ) {
    res.status(400).send({ message: "Бүх талбарыг зөв оруулна уу" });
    return;
  }

  const newOrder = await FoodOrderModel.create({
    user,
    totalPrice,
    foodOrderItems,
    status,
  });
  res.status(201).send({ message: "boltsoon", newOrder });
};
