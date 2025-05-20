import { Request, Response } from "express";
import { UserModel } from "../../models";
import { encryptHash, verifyPasswordToken } from "../../utils";

type NewPassWordBody = {
  newPassword: string;
};

export const ChangePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body as NewPassWordBody;

    if (!newPassword || typeof newPassword !== "string") {
      res.status(400).send({ message: "Нууц үг шаардлагатай" });
      return;
    }

    if (newPassword.length < 6) {
      res
        .status(400)
        .send({ message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" });
      return;
    }

    const token = String(req.query.token);
    if (!token) {
      res.status(400).send({ message: "Токен дутуу байна" });
      return;
    }

    const decodedToken = verifyPasswordToken(token) as { userId?: string };
    if (!decodedToken?.userId) {
      res.status(401).send({ message: "Токен хүчингүй байна" });
      return;
    }

    const hashedPassword = encryptHash(newPassword);

    const updatedUser = await UserModel.findByIdAndUpdate(
      decodedToken.userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
    return;
  } catch (error) {
    res.status(500).send({ message: "Серверийн алдаа", error });
    return;
  }
};
