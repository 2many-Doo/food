import { Schema, model, Model, models } from "mongoose";

type FoodType = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodType>(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);
export const FoodCategory: Model<FoodType> =
  models["FoodCategory"] || model("FoodCategory", FoodCategorySchema);
