import { Schema, model, Model, models } from "mongoose";

type FoodType = {
  foodName: string;
  image: string;
  ingredients: string;
  category: Schema.Types.ObjectId[];
};
const FoodSchema = new Schema<FoodType>(
  {
    foodName: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: [
      { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
    ],
  },
  { timestamps: true }
);
export const Food: Model<FoodType> =
  models["Food"] || model("Food", FoodSchema);
