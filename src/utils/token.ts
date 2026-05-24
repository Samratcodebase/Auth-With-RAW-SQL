import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { ENV } from "../utils/env.js";
import { login } from "../controllers/auth.controller.js";

export interface MyJwtPayload extends JwtPayload {
  userId: number;
  email: string;
}
const generateAcessToken = (userId: number, email: string) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ userId, email }, secretKey, { expiresIn: "15m" });
  return token;
};

const generateRefreshToken = (userId: number, email: string) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ userId, email }, secretKey, { expiresIn: "15m" });
  return token;
};

const verifyRefreshToken = (Token: string) => {
  try {
    const decoded = jwt.verify(Token, ENV.JWT_SECRET_KEY);
    console.log(decoded);

    return decoded;
  } catch (error) {
    throw new Error("Token Signature Failed");
  }
};
export { generateAcessToken, generateRefreshToken, verifyRefreshToken };
