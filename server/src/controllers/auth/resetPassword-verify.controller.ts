import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt-utils";
import { UserModel } from "../../models";

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const token = String(req.query.token);
    const decodeToken = verifyToken(token) as { userId?: string };

    if (!decodeToken?.userId) {
      res.status(401).send({ message: "Буруу эсвэл хүчингүй токен" });
      return;
    }

    const updated = await UserModel.findByIdAndUpdate(
      decodeToken.userId,
      {
        isVerified: true,
        ttl: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.redirect(`${process.env.FRONTEND_ENDPOINT}/resset-password`);
  } catch (error) {
    res.status(500).send({ message: "Серверийн алдаа" });
  }
};
