import { Schema, model, models } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

const FoodOrderItemSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "Food" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);
const FoodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);
export const FoodOrderModel =
  models["Order"] || model("Order", FoodOrderSchema);
