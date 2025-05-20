import { Request, Response } from "express";
import { FoodCategory } from "../../models";

export const deleteFoodCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(404).json({ message: "Category олдсонгүй" });
      return;
    }

    res.status(200).json({ message: "Амжилттай устгалаа", deletedCategory });
    return;
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
    return;
  }
};
