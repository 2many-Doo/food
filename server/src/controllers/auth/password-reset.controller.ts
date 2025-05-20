import { Request, Response } from "express";
import {
  generatePasswordNewToken,
  sendUserVerificationLink,
} from "../../utils";
import { UserModel } from "../../models";

type UserBody = { email: string };

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as UserBody;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(404).send({ message: "Ийм хэрэглэгч олдсонгүй" });
      return;
    }
    const newToken = generatePasswordNewToken({ userId: existingUser._id });

    sendUserVerificationLink(
      `${req.protocol}://${req.get(
        "host"
      )}/auth/resset-password?token=${newToken}`,
      email
    );
    res
      .status(200)
      .send({ message: "Сэргээх холбоос амжилттай илгээгдлээ", newToken });
  } catch (error) {
    res.status(500).send({ message: "Серверийн алдаа", error });
  }
};
