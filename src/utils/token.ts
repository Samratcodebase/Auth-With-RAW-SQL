import jwt from "jsonwebtoken";
import { ENV } from "../utils/env.js";

const generateAcessToken = (id: number, email: string) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ id, email }, secretKey, { expiresIn: "15m" });
  return token;
};

const generateRefreshToken = (userId: number) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "15m" });
  return token;
};

export { generateAcessToken, generateRefreshToken };
