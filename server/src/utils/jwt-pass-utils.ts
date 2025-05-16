import { sign, verify } from "jsonwebtoken";

const SECRETKEY = "my_secret";

export const generatePasswordNewToken = (payload: object) => {
  return sign(payload, SECRETKEY, { expiresIn: "1h" });
};

export const verifyPasswordToken = (token: string) => {
  return verify(token, SECRETKEY);
};
