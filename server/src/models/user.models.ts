import { Schema, model, Model, models } from "mongoose";

export enum UserEnum {
  ADMIN = "Admin",
  USER = "User",
}
type Usertype = {
  ttl: Date;
  email: string;
  role: UserEnum;
  address: string;
  password: string;
  isVerified: boolean;
  phoneNumber: string;
  orderedFood: Schema.Types.ObjectId;
};
const UserSchema = new Schema<Usertype>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    orderedFood: [
      { type: Schema.Types.ObjectId, ref: "FoodOrder", required: true },
    ],
    phoneNumber: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(UserEnum),
      default: UserEnum.ADMIN,
    },
    ttl: { type: Date, default: Date.now() + 24 * 60 * 60 * 1000 },
  },
  { timestamps: true }
);
export const UserModel: Model<Usertype> =
  models["User"] || model("User", UserSchema);
