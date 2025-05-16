import { Request, Response } from "express";
import { UserModel } from "../../models";
import { decryptHash } from "../../utils";

type UserBody = { email: string; password: string };

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser || !password) {
    res.status(400).send({ message: "Хэрэглэгч эсвэл нууц үг буруу" });
    return;
  }

  const isPasswordCorrect = decryptHash(password, existingUser.password);
  if (!isPasswordCorrect) {
    res.status(400).send({ message: "Нууц үг буруу байна" });
    return;
  }

  res.status(200).send({ message: "Амжилттай нэвтэрлээ" });
};
