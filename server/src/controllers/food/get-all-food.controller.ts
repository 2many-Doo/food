import { Request, Response } from "express";
import { Food } from "../../models/food.models";

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id).populate("category");

    if (!food) {
      res.status(404).json({ message: "Хоол олдсонгүй" });
      return;
    }

    res.status(200).json({ message: "Хоол олдлоо", food });
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа", error });
  }
};
