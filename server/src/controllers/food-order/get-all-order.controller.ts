import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const getAllorderController = async (req: Request, res: Response) => {
  const allOrder = await FoodOrderModel.find()
    .populate("User")
    .populate({ path: "FoodOrderItemSchema.food ", model: "Food" });

  const total = await FoodOrderModel.countDocuments();

  res.status(200).send({ allOrder, total });
};
