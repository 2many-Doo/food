import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt-utils";
import { UserModel } from "../../models";

export const verifyUserController = async (req: Request, res: Response) => {
  const token = String(req.query.token);

  const decodeToken = verifyToken(token) as { userId: string };

  await UserModel.findByIdAndUpdate(
    decodeToken.userId,
    {
      isVerified: true,
      ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
    },
    { new: true }
  );

  res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
};
