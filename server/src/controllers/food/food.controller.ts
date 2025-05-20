import { Food } from "../../models/food.models";
import { Request, Response } from "express";

type FoodType = {
  foodName: string;
  image: string;
  ingredients: string;
  category: string;
};

export const FoodController = async (req: Request, res: Response) => {
  try {
    const { foodName, image, ingredients, category } = req.body as FoodType;

    if (!foodName || !image || !ingredients || !category) {
      res.status(400).send({ message: "Бүх талбарыг бөглөнө үү" });
      return;
    }

    const existingFood = await Food.findOne({ foodName });
    if (existingFood) {
      res.status(400).send({ message: "Ийм хоол бүртгэгдсэн байна" });
      return;
    }

    const newFood = await Food.create({
      foodName,
      image,
      ingredients,
      category,
    });

    res.status(200).send({ message: "Амжилттай нэмэгдлээ", newFood });
    return;
  } catch (error) {
    res.status(500).send({ message: "Серверийн алдаа", error });
    return;
  }
};
