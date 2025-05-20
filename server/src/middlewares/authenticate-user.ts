import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-utils";
import { UserModel } from "../models";

export const athenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.split(" ")[1];

  if (!authorization) {
    res
      .status(400)
      .send({ message: "Unauthorized user.Authoriation token is valid" });
    return;
  }

  if (!token) {
    res
      .status(400)
      .send({ message: "Unauthorized user.Authoriation token is missing" });
    return;
  }

  const decodedToken = verifyToken(token) as { userId: string };

  if (!decodedToken || !decodedToken.userId) {
    res
      .status(400)
      .send({ message: "Unauthorized user.Bad request or token in valid" });
    return;
  }

  const existingUser = await UserModel.findById(decodedToken.userId);

  if (!existingUser) {
    res.status(400).send({ message: "User not found" });
    return;
  }

  req.body.user = existingUser;

  next();
};
