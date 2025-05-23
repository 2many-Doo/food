import { Food } from "../../models/food.models";
import { Request, Response } from "express";

export const deleteFoodController = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;

    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404).send({ message: "Ийм хоол олдсонгүй" });
      return;
    }

    await Food.findByIdAndDelete(foodId);

    res.status(200).send({ message: "Амжилттай устгагдлаа" });
    return;
  } catch (error) {
    res.status(500).send({ message: "Серверийн алдаа", error });
    return;
  }
};
