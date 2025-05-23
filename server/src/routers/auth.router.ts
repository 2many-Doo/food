import { Router } from "express";
import {
  passwordReset,
  signinController,
  signupController,
  verifyPassword,
  verifyUserController,
  ChangePassword,
} from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/login", signinController);
authRouter.get("/send-reset-email", passwordReset);
authRouter.post("/resset-password", verifyPassword);
authRouter.post("/resset-password", ChangePassword);
