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

  if (!user) {
    res
      .status(400)
      .send({ message: "Хэрэглэгчийн ID байхгүй эсвэл буруу байна." });
    return;
  }

  if (!totalPrice || typeof totalPrice !== "number" || totalPrice <= 0) {
    res
      .status(400)
      .send({ message: "Нийт үнийг зөв оруулна уу (тоо, эерэг утга)." });
    return;
  }

  if (
    !foodOrderItems ||
    !Array.isArray(foodOrderItems) ||
    foodOrderItems.length === 0
  ) {
    res
      .status(400)
      .send({ message: "Захиалгын хоолнуудын жагсаалтыг заавал өгнө үү." });
    return;
  }

  for (const item of foodOrderItems) {
    if (!item.food || typeof item.food !== "string") {
      res.status(400).send({ message: "Хоолны ID дутуу эсвэл буруу байна." });
      return;
    }
    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      res.status(400).send({
        message: "Хоолны тоо хэмжээг зөв (1 буюу түүнээс дээш) оруулна уу.",
      });
      return;
    }
  }

  const validStatuses = ["PENDING", "CANCELED", "DELIVERED"];
  if (!validStatuses.includes(status)) {
    res.status(400).send({
      message: "Зөвхөн 'PENDING', 'CANCELED', 'DELIVERED' статус зөвшөөрнө.",
    });
    return;
  }

  try {
    const newOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
    });

    res.status(201).send({ message: "Захиалга амжилттай үүслээ", newOrder });
    return;
  } catch (error: any) {
    console.error("Order save error:", error);
    if (error.code === 11000) {
      res.status(409).send({
        message: "Энэ хэрэглэгчийн захиалга аль хэдийн бүртгэгдсэн байна.",
      });
      return;
    }
    res
      .status(500)
      .send({ message: "Серверийн алдаа гарлаа", error: error.message });
    return;
  }
};
