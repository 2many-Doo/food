import { Router } from "express";
import {
  passwordReset,
  signinController,
  signupController,
  verifyPassword,
  verifyUserController,
} from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/login", signinController);
authRouter.post("/send-email-for-reset-password", passwordReset);

authRouter.get("/verify-email", verifyPassword);
