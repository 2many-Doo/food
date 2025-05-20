import { Router } from "express";
import {
  passwordReset,
  signinController,
  signupController,
  verifyPassword,
  verifyUserController,
} from "../controllers";
import { ChangePassword } from "../controllers/auth/change-password.controller";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/login", signinController);
authRouter.get("/send-reset-email", passwordReset);
authRouter.post("/resset-password", verifyPassword);
authRouter.post("/resset-password", ChangePassword);
